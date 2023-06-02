import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResetAssociateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string({}, [rules.confirmed(), rules.minLength(8)]),
    code: schema.string({}, [
      rules.exists({ table: 'password_recovery_codes', column: 'code' }),
      rules.maxLength(5),
    ]),
  })

  public messages = {
    'password.required': 'Senha é obrigatório',
    'password.confirmed': 'Confirmação de senha é obrigatório',
    'password.minLength': 'Sua senha deve conter pelo menos 8 caracteres',
    'code.required': 'Código é obrigatório',
    'code.exists': 'Código inválido',
    'password_confirmation.confirmed': 'As senhas devem ser idênticas',
  }
}
