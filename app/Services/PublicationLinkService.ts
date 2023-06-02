import Publication from 'App/Models/Publication'
import PublicationLink from 'App/Models/PublicationLink'

export default class PublicationLinkService {
  public static async createPublicationLink(
    nextPublication,
    publication: Publication
  ): Promise<void> {
    if (nextPublication.links) {
      nextPublication.links?.forEach(async (link) => {
        await PublicationLink.create({
          name: link.name,
          linkUrl: link.linkUrl,
          publicationId: publication.id,
        })
      })
    }
  }
}
