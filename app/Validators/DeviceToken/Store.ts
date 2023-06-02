import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DeviceTokenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    deviceToken: schema.string.nullableAndOptional(),
  })
}
