import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),
    password: schema.string({}, [rules.minLength(6), rules.confirmed()]),
  })

  public messages = {
    'email.required': 'E-mail é obrigatório',
    'email.email': 'Digite um e-mail válido',
    'email.unique': 'Já existe um usuário com esse endereço de email',
    'password.required': 'Senha é obrigatório',
  }
}
