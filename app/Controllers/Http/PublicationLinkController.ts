import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PublicationLink from 'App/Models/PublicationLink'
import PublicationLinkStoreValidator from 'App/Validators/PublicationLink/Store'

export default class PublicationLinkController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, perPage, sortColumn, sortType } = request.all()

    const query = PublicationLink.query()

    if (sortColumn) {
      query.orderBy(sortColumn, sortType)
    }

    const link = await query.paginate(page, perPage)

    return link
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params
    const link = await PublicationLink.findOrFail(id)

    return link
  }

  public async store({ request }: HttpContextContract) {
    const nextLink = await request.validate(PublicationLinkStoreValidator)
    const link = await PublicationLink.create(nextLink)
    return link
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params
    const { name } = await request.validate(PublicationLinkStoreValidator)
    const link = await PublicationLink.findOrFail(id)
    const nextLink = {
      name: name,
      link: link,
    }
    link.merge(nextLink)
    await link.save()

    return link
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const link = await PublicationLink.findOrFail(id)

    await link.delete()

    return response.json('Link excluido com sucesso')
  }
}
