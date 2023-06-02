import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Country from 'App/Models/Country'

export default class CountryFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Country, Country>
  public name(name: string) {
    return this.$query.where('name', 'like', `%${name}%`)
  }
}
