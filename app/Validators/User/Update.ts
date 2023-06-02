import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export const UserValidatorMessages = {
  'name.required': 'Nome é obrigatório.',
  'cpf.required': 'CPF é obrigatório.',
  'cpf.unique': 'CPF já cadastrado em outro usuário.',
  'username.unique': 'Já existe um usuário com esse login.',
  'email.required': 'E-mail é obrigatório.',
  'email.email': 'Digite um e-mail válido.',
  'email.unique': 'Já existe um usuário com esse endereço de email.',
  'password.required': 'Senha é obrigatório.',
}

export default class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(200)]),
    username: schema.string({}, [rules.maxLength(25)]),
    cpf: schema.string({}, [rules.CPFIsValid()]),
    email: schema.string({}, [rules.email()]),
    password: schema.string.nullableAndOptional({}, [rules.minLength(6)]),
  })

  public messages = UserValidatorMessages
}
