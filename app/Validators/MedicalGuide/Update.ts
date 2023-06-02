import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CollectiveAgreementValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cities: schema.array().members(
      schema.object().members({
        nome: schema.string(),
        microrregiao: schema.object().members({
          mesorregiao: schema.object().members({
            UF: schema.object().members({
              nome: schema.string(),
            }),
          }),
        }),
      })
    ),
  })

  public messages = {
    'companyName.required': 'Nome da empresa é obrigatório',
  }
}
