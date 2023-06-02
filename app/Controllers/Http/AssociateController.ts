import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Associate from 'App/Models/Associate'
import { GenreType } from 'App/Models/User'
import AssociateStoreValidator from 'App/Validators/Associate/Store'
import AssociateUpdateValidator from 'App/Validators/Associate/Update'

export default class AssociateController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, perPage, sortColumn, sortType } = request.all()

    const query = Associate.query().preload('state').preload('role')

    if (sortColumn) {
      query.orderBy(sortColumn, sortType)
    }

    const associates = await query.paginate(page, perPage)

    return associates
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    const associate = await Associate.query()
      .where({ id })
      .preload('state')
      .preload('role')
      .firstOrFail()

    return associate
  }

  public async store({ request }: HttpContextContract) {
    const nextAssociate = await request.validate(AssociateStoreValidator)
    const associate = await Associate.create(nextAssociate)

    return associate
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params
    const { password, ...data } = await request.validate(AssociateUpdateValidator)

    const associate = await Associate.findOrFail(id)
    const nextAssociate = {
      ...data,
      genre: data.genre === GenreType.female ? GenreType.female : GenreType.male,
      password: password ? password : undefined,
    }
    associate.merge(nextAssociate)

    await associate.save()

    return associate
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const associate = await Associate.findOrFail(id)

    await associate.delete()

    return response.json('')
  }
}
