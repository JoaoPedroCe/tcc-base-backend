import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'
import VehicleValidator from 'App/Validators/Vehicle/Store'

export default class VehiclesController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, perPage, sortColumn, sortType } = request.all()

    const query = Vehicle.query().preload('associate')

    if (sortColumn) {
      query.orderBy(sortColumn, sortType)
    }

    const associates = await query.paginate(page, perPage)

    return associates
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    const associate = await Vehicle.query().where({ id }).firstOrFail()

    return associate
  }

  public async store({ request }: HttpContextContract) {
    const nextAssociate = await request.validate(VehicleValidator)
    const associate = await Vehicle.create(nextAssociate)

    return associate
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params
    const { ...data } = await request.validate(VehicleValidator)

    const associate = await Vehicle.findOrFail(id)
    const nextAssociate = {
      ...data,
    }
    associate.merge(nextAssociate)

    await associate.save()

    return associate
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const associate = await Vehicle.findOrFail(id)

    await associate.delete()

    return response.json('')
  }
}
