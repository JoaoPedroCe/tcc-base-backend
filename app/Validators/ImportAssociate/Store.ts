import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ImportAssociateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fileName: schema.string(),
  })
}
