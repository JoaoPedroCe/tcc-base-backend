import { DateTime } from 'luxon'
import { afterCreate, BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Associate from './Associate'

export default class PrivacyPolicy extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fileUrl: string

  @column()
  public createdById: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @beforeCreate()
  public static async deletePrevPrivacyPolicy() {
    await PrivacyPolicy.query().delete()
  }

  @afterCreate()
  public static async updateAcceptedTermsPrivacyPolicy() {
    await User.query().update({ acceptedTerms: false, acceptedTermsDate: null })
    await Associate.query().update({ acceptedTerms: false, acceptedTermsDate: null })
  }
}
