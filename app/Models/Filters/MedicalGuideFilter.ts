import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import MedicalGuide from 'App/Models/MedicalGuide'

export default class MedicalGuideFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof MedicalGuide, MedicalGuide>

  public city(city: string) {
    return this.$query.where('city', 'like', `%${city}%`)
  }
}
