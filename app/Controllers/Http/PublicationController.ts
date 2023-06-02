import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publication from 'App/Models/Publication'
import PublicationStoreValidator from 'App/Validators/Publication/Store'
import PublicationLink from 'App/Models/PublicationLink'
import PublicationLinkService from 'App/Services/PublicationLinkService'

export default class PublicationController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, perPage, sortColumn, sortType } = request.all()

    const query = Publication.query().preload('links').preload('associate')

    if (sortColumn) {
      query.orderBy(sortColumn, sortType)
    }

    const Publications = await query.paginate(page, perPage)

    return Publications
  }
  public async show({ params }: HttpContextContract) {
    const { id } = params

    const publication = await Publication.query().where({ id }).preload('links').firstOrFail()

    return publication
  }

  public async store({ request }: HttpContextContract) {
    const nextPublication = await request.validate(PublicationStoreValidator)
    const publication = await Publication.create({ ...nextPublication })
    PublicationLinkService.createPublicationLink(nextPublication, publication)

    return publication
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params
    const nextPublication = await request.validate(PublicationStoreValidator)
    const publication = await Publication.findOrFail(id)
    publication.merge(nextPublication)

    await publication.save()

    if (nextPublication.links) {
      await PublicationLink.createMany(
        nextPublication.links?.map(({ name, linkUrl }) => ({
          name,
          linkUrl,
          publicationId: id,
        }))
      )
      return
    }

    return publication
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const publication = await Publication.findOrFail(id)

    await publication.delete()

    return response.json('Publicação excluida com sucesso')
  }
}
