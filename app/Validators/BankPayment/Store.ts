import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BankPaymentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    cellphone: schema.string.optional(),
    email: schema.string.optional(),
    value: schema.string.optional(),
    companyName: schema.string.optional(),
    month: schema.string.optional(),
  })
}
