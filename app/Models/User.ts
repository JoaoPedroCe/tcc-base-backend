import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  beforeSave,
  HasOne,
  hasOne,
  afterCreate,
} from '@ioc:Adonis/Lucid/Orm'

import Hash from '@ioc:Adonis/Core/Hash'

import UserFilter from 'App/Models/Filters/UserFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import UserRole from './UserRole'
import Token from './Token'
import { ROLES } from './Role'

import UserAcceptedPrivacyPolicy from 'App/Models/UserAcceptedPrivacyPolicy'

export const GenreType = {
  male: 'male',
  female: 'female',
} as const

export default class User extends compose(BaseModel, Filterable) {
  public static $filter = () => UserFilter
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public cpf: string

  @column()
  public isStaff: boolean

  @column()
  public isActive: boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public createdById: number

  @column()
  public lastEditById: number

  @column()
  public acceptedTerms: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public acceptedTermsDate: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @afterCreate()
  public static async addRole(user: User) {
    await UserRole.create({
      userId: user.id,
      roleId: ROLES.user.id,
    })
  }

  @hasMany(() => Token)
  public tokens: HasMany<typeof Token>

  @hasOne(() => UserRole)
  public role: HasOne<typeof UserRole>

  @hasOne(() => UserAcceptedPrivacyPolicy)
  public userAcceptedPrivacyPolicy: HasOne<typeof UserAcceptedPrivacyPolicy>
}
