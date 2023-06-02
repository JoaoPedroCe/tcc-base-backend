import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Associate from './Associate'

export default class PasswordRecoveryCode extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public associateId: number

  @column()
  public code: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Associate)
  public associate: BelongsTo<typeof Associate>
}
