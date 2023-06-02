import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string({}, [rules.confirmed(), rules.minLength(6)]),
    token: schema.string(),
  })

  public messages = {
    'password.required': 'Senha é obrigatório',
    'password.confirmed': 'Confirmação de senha é obrigatório',
    'password.minLength': 'Use um comprimento mínimo de senha de 6 ou mais caracteres',
    'token.required': 'token ausente',
  }
}
