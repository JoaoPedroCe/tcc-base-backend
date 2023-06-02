import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AssociateValidatorMessages } from './Store'

export default class AssociateUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    isFromTheCategory: schema.boolean.optional(),
    isVolunteerPartner: schema.boolean.optional(),
    name: schema.string({}, [rules.maxLength(200)]),
    email: schema.string({}, [rules.email()]),
    genre: schema.string.optional(),
    company: schema.string.optional({}, [rules.maxLength(300)]),
    cpf: schema.string({}, [rules.CPFIsValid()]),
    associateNumber: schema.number.optional([rules.range(1, 99999)]),
    birthDate: schema.date.optional(),
    zipCode: schema.string.optional({}, [rules.maxLength(9)]),
    address: schema.string.optional({}, [rules.maxLength(200)]),
    addressNumber: schema.number.optional([rules.range(1, 99999)]),
    city: schema.string.optional({}, [rules.maxLength(200)]),
    stateId: schema.number.optional(),
    password: schema.string.nullableAndOptional({}, [rules.minLength(6)]),
    cellphone: schema.string({}, [rules.maxLength(15)]),
    phone: schema.string.optional({}, [rules.maxLength(15)]),
    complement: schema.string.optional([rules.maxLength(200)]),
  })

  public messages = AssociateValidatorMessages
}
