import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CollectiveAgreement from 'App/Models/CollectiveAgreement'
import CollectiveAgreementValidator from 'App/Validators/CollectiveAgreement/Store'

export default class CollectiveAgreementController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, perPage, sortColumn = 'createdAt', sortType = 'desc' } = request.all()

    const query = CollectiveAgreement.filter({ ...request.all() })

    if (sortColumn) {
      query.orderBy(sortColumn, sortType)
    }

    const collectiveAgreements = await query.paginate(page, perPage)

    return collectiveAgreements
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    const collectiveAgreement = await CollectiveAgreement.query().where({ id }).firstOrFail()

    return collectiveAgreement
  }

  public async store({ request }: HttpContextContract) {
    const nextCollectiveAgreement = await request.validate(CollectiveAgreementValidator)

    const collectiveAgreement = await CollectiveAgreement.create(nextCollectiveAgreement)

    return collectiveAgreement
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params
    const nextCollectiveAgreement = await request.validate(CollectiveAgreementValidator)

    const collectiveAgreement = await CollectiveAgreement.findOrFail(id)

    collectiveAgreement.merge(nextCollectiveAgreement)

    await collectiveAgreement.save()

    return collectiveAgreement
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const collectiveAgreement = await CollectiveAgreement.findOrFail(id)

    await collectiveAgreement.delete()
    return response.json('')
  }
}
