import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/Country'

export default class CountryController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, perPage, sortColumn, sortType } = request.all()

    const query = Country.filter(request.all())

    if (sortColumn) {
      query.orderBy(sortColumn, sortType)
    }

    const countries = await query.paginate(page, perPage)

    return countries
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    const country = await Country.query().where({ id }).firstOrFail()

    return country
  }
}
