import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ForgotAssociateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cpf: schema.string({}, [rules.CPFIsValid()]),
  })

  public messages = {
    'cpf.required': 'Cpf é obrigatório',
  }
}
