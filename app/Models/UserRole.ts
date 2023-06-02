import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserRole extends BaseModel {
  public static table = 'users_role'

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public associateId: number

  @column()
  public roleGrantedBy: number

  @column()
  public roleId: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
