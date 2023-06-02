import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserRoleUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number(),
    role_id: schema.number([rules.exists({ table: 'roles', column: 'id' })]),
  })

  public messages = {
    'user_id.required': 'Id do usuário ausente',
    'role_id.required': 'Id do novo cargo ausente',
    'role_id.exists': 'Informe uma cargo valido',
  }
}
