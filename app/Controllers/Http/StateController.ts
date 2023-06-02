import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import State from 'App/Models/State'

export default class StateController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, perPage, sortColumn, sortType } = request.all()

    const query = State.filter(request.all())

    if (sortColumn) {
      query.orderBy(sortColumn, sortType)
    }

    const states = await query.paginate(page, perPage)

    return states
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    const state = await State.query().where({ id }).firstOrFail()

    return state
  }
}
