import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PreRegistrationValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(200)]),
    cpf: schema.string({}, [
      rules.CPFIsValid(),
      rules.unique({
        table: 'associates',
        column: 'cpf',
      }),
    ]),
    email: schema.string({}, [
      rules.trim(),
      rules.email(),
      rules.maxLength(256),
      rules.unique({
        table: 'associates',
        column: 'email',
      }),
    ]),
    password: schema.string({}, [rules.minLength(8), rules.maxLength(20), rules.confirmed()]),
    cellphone: schema.string([rules.maxLength(15)]),
  })

  public messages = {
    'name.required': 'Nome é obrigatório',
    'password.required': 'Senha é obrigatório',
    'password.confirmed': 'Confirmação de senha é obrigatório',
    'email.required': 'E-mail é obrigatório.',
    'email.email': 'Digite um e-mail válido.',
    'email.unique': 'Já existe um usuário com esse endereço de email.',
    'password.minLength': 'Sua senha deve conter pelo menos 8 caracteres',
    'password_confirmation.confirmed': 'As senhas devem ser idênticas',
    'cpf.required': 'CPF é obrigatório.',
    'cpf.unique': 'CPF já cadastrado em outro usuário.',
  }
}
