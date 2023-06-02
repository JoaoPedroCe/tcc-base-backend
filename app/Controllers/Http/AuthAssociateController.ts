import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Token from 'App/Models/Token'
import MailService from 'App/Services/MailService'

import RegisterValidator from 'App/Validators/Auth/Register'
import errorReporter from 'App/utils/errorReporter'
import { DateTime } from 'luxon'
import I18n from 'App/i18n/pt-BR'
import AuthServiceAssociate from 'App/Services/AuthServiceAssociate'
import Associate from 'App/Models/Associate'
import LoginValidatorAssociate from 'App/Validators/Auth/LoginValidatorAssociate'
import ForgotAssociateValidator from 'App/Validators/Auth/ForgotAssociate'
import codeGenerator from 'App/utils/codeGenerator'
import PasswordRecoveryCode from 'App/Models/PasswordRecoveryCode'
import ResetAssociateValidator from 'App/Validators/Auth/ResetAssociate'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const { cpf, password } = await request.validate(LoginValidatorAssociate)
    const { associate, token } = await AuthServiceAssociate.login({ cpf, password, auth })
    return { associate, token }
  }

  public async register({ request, response }: HttpContextContract) {
    const { name, email, password } = await request.validate(RegisterValidator)

    await AuthServiceAssociate.register({ name, email, password })

    return response.json('Cadastrado com sucesso! Ative sua conta para continuar')
  }

  public async forgot({ request, response }: HttpContextContract) {
    const { cpf } = await request.validate(ForgotAssociateValidator)
    const associate = await Associate.findBy('cpf', cpf)
    const code = codeGenerator()
    if (!associate) {
      return response.status(404).json(
        errorReporter({
          cpf: I18n.auth.forgot.cpfNotFound,
        })
      )
    }
    const { id, email } = associate

    await MailService.sendForgotAppPassword(associate, code)
    await PasswordRecoveryCode.create({ associateId: id, code: code })
    return email
  }

  public async reset({ request, response }: HttpContextContract) {
    const { code, password } = await request.validate(ResetAssociateValidator)

    const associatePasswordRecoveryCode = await PasswordRecoveryCode.findByOrFail('code', code)

    const { createdAt } = associatePasswordRecoveryCode

    const minutes = DateTime.now().diff(createdAt, 'hours').toObject().minutes || 0

    if (minutes > 10) {
      return response.status(400).json(
        errorReporter({
          code: I18n.auth.reset.expiredCodeTime,
        })
      )
    }

    const associate = await associatePasswordRecoveryCode.related('associate').query().firstOrFail()

    associate.password = password
    associatePasswordRecoveryCode.delete()
    await associate.save()

    return response.json(I18n.auth.reset.success)
  }

  public async activate({ request, response }: HttpContextContract) {
    const { token } = request.all()

    const associateToken = await Token.findByOrFail('token', token)

    const associate = await associateToken.related('associate').query().firstOrFail()

    await associate.save()

    associateToken.delete()

    return response.status(200).send(I18n.auth.activate.success)
  }
}
