import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MailService from 'App/Services/MailService'
import I18n from 'App/i18n/pt-BR'
import BankPaymentValidator from 'App/Validators/BankPayment/Store'

export default class BankPaymentController {
  public async store({ request, response }: HttpContextContract) {
    const nextBankPayment = await request.validate(BankPaymentValidator)
    await MailService.sendBankPaymentEmails(nextBankPayment)

    return response.json(I18n.email.success)
  }
}
