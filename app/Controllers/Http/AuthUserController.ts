import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Token from 'App/Models/Token'
import MailService from 'App/Services/MailService'
import TokenService from 'App/Services/TokenService'

import LoginValidator from 'App/Validators/Auth/Login'
import RegisterValidator from 'App/Validators/Auth/Register'
import ForgotValidator from 'App/Validators/Auth/Forgot'
import ResetValidator from 'App/Validators/Auth/Reset'
import errorReporter from 'App/utils/errorReporter'
import { DateTime } from 'luxon'
import I18n from 'App/i18n/pt-BR'
import AuthServiceUser from 'App/Services/AuthServiceUser'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)
    const { user, token } = await AuthServiceUser.login({ email, password, auth })
    return { user, token }
  }

  public async register({ request, response }: HttpContextContract) {
    const { name, email, password } = await request.validate(RegisterValidator)

    await AuthServiceUser.register({ name, email, password })

    return response.json('Cadastrado com sucesso! Ative sua conta para continuar')
  }

  public async forgot({ request, response }: HttpContextContract) {
    const { email } = await request.validate(ForgotValidator)
    const type = 'forgotpassword'
    const user = await User.findBy('email', email)

    if (!user) {
      return response.status(404).json(
        errorReporter({
          email: I18n.auth.forgot.emailNotfound,
        })
      )
    }
    const { id: userId } = user
    const userToken = await Token.query().where({ userId, type }).first()

    if (userToken) {
      const { updatedAt } = userToken
      const minutes = DateTime.now().diff(updatedAt, 'minutes').toObject().minutes || 0

      if (minutes < 6) {
        return response.status(400).json(
          errorReporter({
            email: I18n.auth.forgot.expiredTime,
          })
        )
      }

      userToken.updatedAt = DateTime.now()
      await userToken.save()
    }

    const token = userToken?.token || (await TokenService.create(userId, type))
    await MailService.sendForgotPassword(user, token)

    return response.json(I18n.auth.forgot.success(email))
  }

  public async reset({ request, response }: HttpContextContract) {
    const { token, password } = await request.validate(ResetValidator)

    const userToken = await Token.findByOrFail('token', token)
    const { createdAt } = userToken

    const hours = DateTime.now().diff(createdAt, 'hours').toObject().hours || 0

    if (hours > 2) {
      return response.status(400).json(
        errorReporter({
          expiredTime: I18n.auth.reset.expiredTime,
        })
      )
    }

    const user = await userToken.related('user').query().firstOrFail()

    user.password = password
    userToken.delete()

    await user.save()

    return response.json(I18n.auth.reset.success)
  }

  public async activate({ request, response }: HttpContextContract) {
    const { token } = request.all()

    const userToken = await Token.findByOrFail('token', token)

    const user = await userToken.related('user').query().firstOrFail()

    await user.save()

    userToken.delete()

    return response.status(200).send(I18n.auth.activate.success)
  }
}
