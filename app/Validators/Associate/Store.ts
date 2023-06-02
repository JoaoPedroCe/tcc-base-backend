import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export const AssociateValidatorMessages = {
  'name.required': 'Nome é obrigatório.',
  'cpf.required': 'CPF é obrigatório.',
  'cpf.unique': 'CPF já cadastrado em outro usuário.',
  'company.required': 'Empresa é obrigatório.',
  'associateNumber.required': 'Número de associado é obrigatório.',
  'associateNumber.unique': 'Número de associado já cadastrado.',
  'email.required': 'E-mail é obrigatório.',
  'email.email': 'Digite um e-mail válido.',
  'email.unique': 'Já existe um usuário com esse endereço de email.',
  'password.required': 'Senha é obrigatório.',
  'stateId.required': 'Estado é obrigatório',
  'countryId.required': 'País é obrigatório',
}

export default class AssociateStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    isFromTheCategory: schema.boolean.optional(),
    isVolunteerPartner: schema.boolean.optional(),
    name: schema.string({}, [rules.maxLength(200)]),
    company: schema.string.optional({}, [rules.maxLength(300)]),
    associateNumber: schema.number.optional([
      rules.range(1, 99999),
      rules.unique({ table: 'associates', column: 'associate_number' }),
    ]),
    birthDate: schema.date.optional(),
    zipCode: schema.string.optional([rules.maxLength(9)]),
    address: schema.string.optional([rules.maxLength(200)]),
    addressNumber: schema.number.optional([rules.range(1, 99999)]),
    city: schema.string.optional([rules.maxLength(200)]),
    stateId: schema.number.optional(),
    cpf: schema.string({}, [
      rules.CPFIsValid(),
      rules.unique({
        table: 'associates',
        column: 'cpf',
      }),
    ]),
    email: schema.string({}, [
      rules.trim(),
      rules.email(),
      rules.maxLength(256),
      rules.unique({
        table: 'associates',
        column: 'email',
      }),
    ]),
    password: schema.string({}, [rules.minLength(6), rules.maxLength(20)]),
    cellphone: schema.string([rules.maxLength(15)]),
    phone: schema.string.optional([rules.maxLength(14)]),
    complement: schema.string.optional([rules.maxLength(200)]),
  })

  public messages = AssociateValidatorMessages
}
