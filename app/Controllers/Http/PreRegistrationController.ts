import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Associate from 'App/Models/Associate'
import PreRegistrationValidator from 'App/Validators/PreRegistration/Store'

export default class PreRegistrationController {
  public async store({ request }: HttpContextContract) {
    const nextAssociate = await request.validate(PreRegistrationValidator)
    const associate = await Associate.create(nextAssociate)

    return associate
  }
}
