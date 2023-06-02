import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import DependentEmail from './DependentEmail'

export default class JoinSindalquimEmail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cep: string

  @column()
  public admissionDate: string

  @column()
  public address: string

  @column()
  public name: string

  @column()
  public city: string

  @column()
  public birthDate: string

  @column()
  public cellphone: string

  @column()
  public companyName: string

  @column()
  public complement: string

  @column()
  public cpf: string

  @column()
  public district: string

  @column()
  public genre: string

  @column()
  public maritalStatus: string

  @column()
  public number: string

  @column()
  public officeOrFunction: string

  @column()
  public phone: string

  @column()
  public rg: string

  @column()
  public uf: string

  @hasMany(() => DependentEmail)
  public dependents: HasMany<typeof DependentEmail>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
