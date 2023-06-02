import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import errorReporter from 'App/utils/errorReporter'
import UserStoreValidator from 'App/Validators/User/Store'
import UserUpdateValidator from 'App/Validators/User/Update'
import I18n from 'App/i18n/pt-BR'

export default class UserController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, perPage, sortColumn, sortType } = request.all()

    const query = User.filter(request.all()).preload('role')
    if (sortColumn) {
      query.orderBy(sortColumn, sortType)
    }

    const users = await query.paginate(page, perPage)

    return users
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params
    const user = await User.findOrFail(id)

    return user
  }

  public async store({ auth, request }: HttpContextContract) {
    const nextUser = await request.validate(UserStoreValidator)
    const user = await User.create({
      ...nextUser,
      createdById: auth.user?.id,
      lastEditById: auth.user?.id,
    })

    return user
  }

  public async update({ auth, params, request }: HttpContextContract) {
    const { id } = params
    const { username, name, email, cpf, password } = await request.validate(UserUpdateValidator)

    const user = await User.findOrFail(id)
    const nextUser = {
      username,
      name,
      email,
      cpf,
      lastEditById: auth.user?.id,
      password: password ? password : undefined,
    }

    user.merge(nextUser)

    await user.save()

    return user
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    const { id } = params
    const user = await User.findOrFail(id)
    if (auth.user?.id === user.id)
      return response.status(400).json(errorReporter({ user: I18n.user.delete }))
    await user.delete()

    return response.json('')
  }
}
