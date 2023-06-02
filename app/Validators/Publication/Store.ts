import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PublicationStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}, [rules.maxLength(100)]),
    description: schema.string({}, [rules.maxLength(3000)]),
    associateId: schema.number(),
    isPublished: schema.string.optional(),
    links: schema.array.optional().members(
      schema.object().members({
        name: schema.string.optional(),
        linkUrl: schema.string.optional(),
      })
    ),
    stateId: schema.number.optional(),
    city: schema.string.optional(),
    mediaFileUrl1: schema.string.optional(),
    mediaFileUrl2: schema.string.optional(),
    mediaFileUrl3: schema.string.optional(),
    mediaFileUrl4: schema.string.optional(),
  })

  public messages = {
    'title.required': 'Informe um titulo',
    'description.required': 'Informe uma descrição',
    'type.enum': 'Informe um tipo válido {{options.choices}}',
  }
}
