import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidatorAssociate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cpf: schema.string({}),
    password: schema.string({}, [rules.minLength(8)]),
  })

  public messages = {
    'cpf.required': 'E-mail é obrigatório',
    'cpf.cpf': 'Digite um e-mail válido',
    'password.required': 'Senha é obrigatório',
    'password.minLength': 'Mínimo de 8 caracteres',
  }
}
