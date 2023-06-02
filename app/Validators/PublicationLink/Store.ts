import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PublicationLinkStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(200)]),
    linkUrl: schema.string({}, [rules.maxLength(500)]),
    publicationId: schema.number(),
  })
}
