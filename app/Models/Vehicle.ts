import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Associate from './Associate'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public model: string

  @column()
  public year: string

  @column()
  public brand: string

  @column()
  public annotations: string

  @column()
  public category: string

  @column()
  public plate: string

  @column()
  public document: string

  @column()
  public associateId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Associate)
  public associate: BelongsTo<typeof Associate>
}
