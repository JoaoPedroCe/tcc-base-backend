import Drive from '@ioc:Adonis/Core/Drive'
import { DateTime } from 'luxon'
import {
  afterDelete,
  afterSave,
  BaseModel,
  beforeUpdate,
  belongsTo,
  BelongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import PublicationLink from 'App/Models/PublicationLink'
import State from './State'
import DeviceToken from './DeviceToken'
import FCM from '@ioc:Adonis/Addons/FCM'
import Associate from './Associate'

export const PublicationType = {
  news: 'Notícias',
  benefit: 'Benefícios',
} as const

export default class Publication extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public associateId: number

  @column()
  public mediaFileUrl: string

  @column()
  public description: string

  @column()
  public isPublished: string

  @column()
  public stateId: number

  @column()
  public city: string

  @hasMany(() => PublicationLink)
  public links: HasMany<typeof PublicationLink>

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public publishedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => State)
  public state: BelongsTo<typeof State>

  @belongsTo(() => Associate)
  public associate: BelongsTo<typeof Associate>

  @afterSave()
  public static async updateIsPublishedStatus(publication: Publication) {
    if (publication.isPublished === 'Aprovado')
      return await Publication.query()
        .where({ id: publication.id })
        .update({ publishedAt: new Date() })
    // if (publication.type === PublicationType.news) {
    //   const devices = await DeviceToken.all()

    //   const batchSize = 30

    //   for (let i = 0; i < devices.length; i += batchSize) {
    //     const batch = devices.slice(i, i + batchSize)
    //     batch.forEach(async (data) => {
    //       FCM.send(
    //         {
    //           notification: {
    //             title: publication.title,
    //             body: publication.description,
    //           },
    //           data: {
    //             id: publication.id,
    //             title: publication.title,
    //             description: publication.description,
    //             image: publication.mediaFileUrl,
    //             link: publication.links,
    //           },
    //         },
    //         data.$original.deviceToken
    //       )
    //     })
    //     await new Promise((r) => setTimeout(r, 1000))
    //   }
    // }
  }

  @afterSave()
  public static async moveFile({ id, mediaFileUrl }: Publication) {
    if (!(await Drive.exists(`publications_tmp/${mediaFileUrl}`))) return
    await Drive.move(
      `publications_tmp/${mediaFileUrl}`,
      `publications/${id}/publication_image.png`
    ),
      { overwrite: true }
  }

  @beforeUpdate()
  public static async deletePublicationLinkRecords(publication: Publication) {
    await PublicationLink.query().delete().where({ publicationId: publication.id })
  }

  @afterDelete()
  public static async deleteFile(publication: Publication) {
    await Drive.delete(`publications/${publication.id}`)
  }
}
