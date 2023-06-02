import { DateTime } from 'luxon'
import {
  afterCreate,
  BaseModel,
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import UserRole from './UserRole'
import { ROLES } from './Role'
import Token from './Token'
import UserAcceptedPrivacyPolicy from './UserAcceptedPrivacyPolicy'
import State from './State'
import AssociateFilter from './Filters/AssociateFilter'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import PasswordRecoveryCode from './PasswordRecoveryCode'
import Publication from './Publication'
import Vehicle from './Vehicle'

export const GenreType = {
  male: 'male',
  female: 'female',
} as const

type TypeGenreType = typeof GenreType[keyof typeof GenreType]

export default class Associate extends compose(BaseModel, Filterable) {
  public static $filter = () => AssociateFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public company: string

  @column()
  public cpf: string

  @column()
  public associateNumber: number

  @column.dateTime()
  public birthDate: DateTime

  @column()
  public genre: TypeGenreType

  @column()
  public zipCode: string

  @column()
  public address: string

  @column()
  public addressNumber: number

  @column()
  public complement: string

  @column()
  public city: string

  @column()
  public stateId: number

  @column()
  public phone: string

  @column()
  public cellphone: string

  @column()
  public avatarUrl: string | null

  @column()
  public isActive: boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public acceptedTerms: boolean

  @column()
  public isFromTheCategory: boolean

  @column()
  public isVolunteerPartner: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public acceptedTermsDate: DateTime

  @beforeSave()
  public static async hashPassword(associate: Associate) {
    if (associate.$dirty.password) {
      associate.password = await Hash.make(associate.password)
    }
  }

  @afterCreate()
  public static async addRole(associate: Associate) {
    await UserRole.create({
      associateId: associate.id,
      roleId: ROLES.user.id,
    })
  }

  @hasMany(() => PasswordRecoveryCode)
  public passwordRecoveryCodes: HasMany<typeof PasswordRecoveryCode>

  @hasMany(() => Token)
  public tokens: HasMany<typeof Token>

  @hasMany(() => Vehicle)
  public vehicle: HasMany<typeof Vehicle>

  @hasOne(() => UserRole)
  public role: HasOne<typeof UserRole>

  @hasOne(() => UserAcceptedPrivacyPolicy)
  public userAcceptedPrivacyPolicy: HasOne<typeof UserAcceptedPrivacyPolicy>

  @belongsTo(() => State)
  public state: BelongsTo<typeof State>

  @hasMany(() => Publication)
  public associateIds: HasMany<typeof Publication>
}
