import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import StateFilter from 'App/Models/Filters/StateFilter'

export default class State extends compose(BaseModel, Filterable) {
  public static $filter = () => StateFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public abbreviation: string

  @column()
  public name: string

  @column()
  public isActive: boolean

  @column()
  public createdById: number

  @column()
  public lastEditById: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
