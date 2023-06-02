import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MedicalGuideSolicitationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cellphone: schema.string.optional(),
    email: schema.string.optional(),
    name: schema.string.optional(),
    city: schema.string.optional(),
    doctorName: schema.string.optional(),
    specialty: schema.string.optional(),
    clinicName: schema.string.optional(),
  })
}
