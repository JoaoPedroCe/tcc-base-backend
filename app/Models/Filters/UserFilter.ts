import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class UserFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof User, User>
  public name(name: string) {
    return this.$query.where('name', 'like', `%${name}%`)
  }
  public cpf(cpf: string) {
    return this.$query.where('cpf', 'like', `%${cpf}%`)
  }
  public email(email: string) {
    return this.$query.where('email', 'like', `%${email}%`)
  }
  public username(username: string) {
    return this.$query.where('username', 'like', `%${username}%`)
  }
}
