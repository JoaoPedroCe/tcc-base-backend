import { DateTime } from 'luxon'
import { afterCreate, BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import PrivacyPolicy from './PrivacyPolicy'
import Associate from './Associate'

export default class AssociateAcceptedPrivacyPolicy extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public associateId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => Associate)
  public associate: BelongsTo<typeof Associate>

  @belongsTo(() => PrivacyPolicy)
  public privacyPolicy: BelongsTo<typeof PrivacyPolicy>

  @afterCreate()
  public static async updateUserAcceptedTerms(associateAccepted: AssociateAcceptedPrivacyPolicy) {
    await Associate.query()
      .where({ id: associateAccepted.associateId })
      .update({ acceptedTerms: true, acceptedTermsDate: new Date() })
  }
}
