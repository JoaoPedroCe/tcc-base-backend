import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Associate from 'App/Models/Associate'
import AssociateAcceptedPrivacyPolicy from 'App/Models/AssociateAcceptedPrivacyPolicy'

export default class AssociateAcceptedPrivacyPoliciesController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, perPage, sortColumn, sortType } = request.all()

    const query = Associate.filter({ acceptedTerms: true, ...request.all() }).preload('state')

    if (sortColumn) {
      query.orderBy(sortColumn, sortType)
    }

    const privacyPolicy = await query.paginate(page, perPage)

    return privacyPolicy
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    const privacyPolicy = await AssociateAcceptedPrivacyPolicy.query()
      .where({ id })
      .preload('associate')
      .firstOrFail()

    return privacyPolicy
  }

  public async store({ auth }: HttpContextContract) {
    const privacyPolicy = await AssociateAcceptedPrivacyPolicy.create({
      associateId: auth.user?.id,
    })
    return privacyPolicy
  }
}
