import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class JoinSindalquimValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    address: schema.string(),
    admissionDate: schema.string(),
    birthDate: schema.string(),
    cellphone: schema.string(),
    cep: schema.string(),
    city: schema.string(),
    companyName: schema.string(),
    complement: schema.string.optional(),
    cpf: schema.string(),
    district: schema.string(),
    genre: schema.string(),
    maritalStatus: schema.string(),
    name: schema.string(),
    number: schema.string(),
    officeOrFunction: schema.string(),
    phone: schema.string.optional(),
    rg: schema.string(),
    uf: schema.string(),
    dependents: schema.array.optional().members(
      schema.object().members({
        birthDate: schema.string.optional(),
        name: schema.string.optional(),
        related: schema.string.optional(),
      })
    ),
  })
}
