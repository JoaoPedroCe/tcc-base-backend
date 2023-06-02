import { DateTime } from 'luxon'
import { afterCreate, BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import PrivacyPolicy from 'App/Models/PrivacyPolicy'

export default class UserAcceptedPrivacyPolicy extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => PrivacyPolicy)
  public privacyPolicy: BelongsTo<typeof PrivacyPolicy>

  @afterCreate()
  public static async updateUserAcceptedTerms(userAccepted: UserAcceptedPrivacyPolicy) {
    await User.query()
      .where({ id: userAccepted.userId })
      .update({ acceptedTerms: true, acceptedTermsDate: new Date() })
  }
}
