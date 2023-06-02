import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserValidatorMessages } from './Update'

export default class UserStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(200)]),
    username: schema.string({}, [
      rules.maxLength(25),
      rules.unique({ table: 'users', column: 'username' }),
    ]),
    cpf: schema.string({}, [
      rules.CPFIsValid(),
      rules.unique({
        table: 'users',
        column: 'cpf',
      }),
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.maxLength(256),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),
    password: schema.string({}, [rules.minLength(6), rules.maxLength(20)]),
  })

  public messages = UserValidatorMessages
}
