import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import MedicalGuideFilter from './Filters/MedicalGuideFilter'

export default class MedicalGuide extends compose(BaseModel, Filterable) {
  public static $filter = () => MedicalGuideFilter
  @column({ isPrimary: true })
  public id: number

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public createdById: number

  @column()
  public lastEditById: number
}
