import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MailService from 'App/Services/MailService'
import MedicalGuideSolicitationValidator from 'App/Validators/MedicalGuideSolicitation/Store'

export default class MedicalGuideSolicitationController {
  public async store({ request }: HttpContextContract) {
    const nextMedicalGuideSolicitation = await request.validate(MedicalGuideSolicitationValidator)
    await MailService.sendMedicalGuideSolicitationEmails(nextMedicalGuideSolicitation)
  }
}
