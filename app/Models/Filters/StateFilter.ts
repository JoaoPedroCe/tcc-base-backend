import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import State from 'App/Models/State'

export default class StateFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof State, State>
  public name(name: string) {
    return this.$query.where('name', 'like', `%${name}%`)
  }
  public abbreviation(abbreviation: string) {
    return this.$query.where('abbreviation', 'like', `%${abbreviation}%`)
  }
}
