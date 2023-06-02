import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CollectiveAgreementValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    companyName: schema.string({}, [rules.maxLength(200)]),
    fileName: schema.string(),
    collectiveAgreementName: schema.string({}, [rules.maxLength(200)]),
  })

  public messages = {
    'companyName.required': 'Nome da empresa é obrigatório',
    'fileName.required': 'Arquivo de acordo coletivo é obrigatório',
    'collectiveAgreementName.required': 'Nome do acordo coletivo é obrigatório',
  }
}
