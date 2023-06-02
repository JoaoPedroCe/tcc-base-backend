import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MailService from 'App/Services/MailService'
import JoinSindalquimValidator from 'App/Validators/JoinSindalquim/Store'
import I18n from 'App/i18n/pt-BR'

export default class JoinSindalquimsController {
  public async store({ request, response }: HttpContextContract) {
    const nextJoinSindalquim = await request.validate(JoinSindalquimValidator)
    await MailService.sendJoinSindalquimEmails(nextJoinSindalquim)

    return response.json(I18n.email.success)
  }
}
