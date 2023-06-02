import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Associate from 'App/Models/Associate'

export default class UserFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Associate, Associate>

  public name(name: string) {
    return this.$query.where('name', 'like', `%${name}%`)
  }
  public cpf(cpf: string) {
    return this.$query.where('cpf', 'like', `%${cpf}%`)
  }
  public email(email: string) {
    return this.$query.where('email', 'like', `%${email}%`)
  }
  public phone(phone: string) {
    return this.$query.where('phone', 'like', `%${phone}%`)
  }
  public cellphone(cellphone: string) {
    return this.$query.where('cellphone', 'like', `%${cellphone}%`)
  }
  public company(company: string) {
    return this.$query.where('company', 'like', `%${company}%`)
  }
  public username(username: string) {
    return this.$query.where('username', 'like', `%${username}%`)
  }
  public associateNumber(associateNumber: number) {
    return this.$query.where('associate_number', '=', associateNumber)
  }
  public birthDate(birthDate: DateTime) {
    return this.$query.where('publishedOn', '<=', birthDate.toUTC().toSQLDate())
  }
  public acceptedTerms(acceptedTerms: boolean) {
    return this.$query.where('acceptedTerms', '=', acceptedTerms)
  }
}
