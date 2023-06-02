import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MailService from 'App/Services/MailService'
import JudiciaryValidator from 'App/Validators/Judiciary/Store'

export default class JudiciariesController {
  public async store({ request }: HttpContextContract) {
    const nextJudiciary = await request.validate(JudiciaryValidator)
    await MailService.sendJudiciaryEmails(nextJudiciary)
  }
}
