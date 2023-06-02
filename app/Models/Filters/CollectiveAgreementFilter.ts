import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import CollectiveAgreement from '../CollectiveAgreement'

export default class CollectiveAgreementFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof CollectiveAgreement, CollectiveAgreement>
  public companyName(companyName: string) {
    return this.$query.where('companyName', 'like', `%${companyName}%`)
  }
}
