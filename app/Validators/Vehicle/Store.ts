import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export const AssociateValidatorMessages = {}

export default class VehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    model: schema.string({}, [rules.maxLength(200)]),
    year: schema.string(),
    brand: schema.string(),
    annotations: schema.string.optional(),
    plate: schema.string(),
    document: schema.string(),
    category: schema.string(),
    associateId: schema.number(),
  })

  public messages = AssociateValidatorMessages
}
