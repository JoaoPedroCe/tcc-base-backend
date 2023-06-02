import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import {
  saveBankPaymentEmail,
  saveJoinSindalquimEmail,
  saveJudiciaryEmail,
  saveMedicalGuideSolicitationEmail,
} from './SaveEmailService'

const APP_NAME = Env.get('APP_NAME')

export default class MailService {
  public static async sendAccountVerification({ name, email }, token: string): Promise<void> {
    const accountVerificationUrl = `${Env.get('FRONT_URL')}/auth/activate/${token}`

    await Mail.sendLater((message) => {
      message
        .htmlView('emails/accountVerification', {
          name,
          email,
          accountVerificationUrl,
          APP_NAME,
        })
        .to(email)
        .from(Env.get('SMTP_USERNAME'))
        .subject(`${APP_NAME} - Confirmação de cadastro`)
    })
  }

  public static async sendForgotPassword({ name, email }, token: string): Promise<void> {
    const resetPasswordUrl = Env.get('APP_FRONT_END_URL') + '/auth/reset/' + token
    try {
      await Mail.send((message) => {
        message
          .htmlView('emails/forgotPassword', {
            name,
            token,
            resetPasswordUrl,
            APP_NAME,
          })
          .to(email)
          .from(Env.get('SMTP_USERNAME'))
          .subject(`${APP_NAME} - Recuperação de Senha`)
      })
    } catch (error) {
      console.log(error)
    }
  }

  public static async sendForgotAppPassword(
    { name, email },
    passwordRecoveryCode: string
  ): Promise<void> {
    try {
      await Mail.send((message) => {
        message
          .htmlView('emails/forgotPasswordAssociate', {
            name,
            passwordRecoveryCode,
            APP_NAME,
          })
          .to(email)
          .from(Env.get('SMTP_USERNAME'))
          .subject(`${APP_NAME} - Recuperação de Senha`)
      })
    } catch (error) {
      console.log(error)
    }
  }

  public static async sendJoinSindalquimEmails({
    address,
    admissionDate,
    birthDate,
    cellphone,
    cep,
    city,
    companyName,
    complement,
    cpf,
    district,
    genre,
    maritalStatus,
    name,
    number,
    officeOrFunction,
    phone,
    rg,
    uf,
    dependents,
  }): Promise<void> {
    await saveJoinSindalquimEmail(
      {
        address: address,
        admissionDate: admissionDate,
        birthDate: birthDate,
        cellphone: cellphone,
        cep: cep,
        city: city,
        companyName: companyName,
        complement: complement,
        cpf: cpf,
        district: district,
        genre: genre,
        maritalStatus: maritalStatus,
        name: name,
        number: number,
        officeOrFunction: officeOrFunction,
        phone: phone,
        rg: rg,
        uf: uf,
      },
      dependents
    )
    try {
      await Mail.send((message) => {
        message
          .htmlView('emails/joinSindalquim', {
            address,
            admissionDate,
            birthDate,
            cellphone,
            cep,
            city,
            companyName,
            complement,
            cpf,
            district,
            genre,
            maritalStatus,
            name,
            number,
            officeOrFunction,
            phone,
            rg,
            uf,
            dependents,
          })
          .to(Env.get('JOIN_SINDALQUIM_EMAIL'))
          .from(Env.get('SMTP_USERNAME'))
          .subject(`Nova solicitação de filiação para ${name}`)
      })
    } catch (error) {
      console.log(error)
    }
  }

  public static async sendJudiciaryEmails({ cellphone, email, messageEmail, name }): Promise<void> {
    await saveJudiciaryEmail({
      cellphone: cellphone,
      email: email,
      name: name,
      messageEmail: messageEmail,
    })
    try {
      await Mail.send((message) => {
        message
          .htmlView('emails/judiciary', { cellphone, email, name, messageEmail })
          .to(Env.get('JUDICIARY_EMAIL'))
          .from(Env.get('SMTP_USERNAME'))
          .subject(`Contado Jurídico - ${name}`)
      })
    } catch (error) {
      console.log(error)
    }
  }

  public static async sendMedicalGuideSolicitationEmails({
    cellphone,
    email,
    name,
    clinicName,
    doctorName,
    specialty,
    city,
  }): Promise<void> {
    await saveMedicalGuideSolicitationEmail({
      cellphone: cellphone,
      email: email,
      name: name,
      clinicName: clinicName,
      doctorName: doctorName,
      specialty: specialty,
      city: city,
    })
    try {
      await Mail.send((message) => {
        message
          .htmlView('emails/medicalGuide', {
            cellphone,
            email,
            name,
            doctorName,
            clinicName,
            specialty,
            city,
          })
          .to(Env.get('MEDICAL_GUIDE_EMAIL'))
          .from(Env.get('SMTP_USERNAME'))
          .subject(`Solicitação de guia médica - ${name}`)
      })
    } catch (error) {
      console.log(error)
    }
  }

  public static async sendBankPaymentEmails({
    name,
    cellphone,
    email,
    month,
    value,
    companyName,
  }): Promise<void> {
    await saveBankPaymentEmail({
      name: name,
      cellphone: cellphone,
      email: email,
      month: month,
      value: value,
      companyName: companyName,
    })
    try {
      await Mail.send((message) => {
        message
          .htmlView('emails/bankPayment', { name, cellphone, email, month, value, companyName })
          .to(Env.get('BANK_PAYMENT_EMAIL'))
          .from(Env.get('SMTP_USERNAME'))
          .subject(`Solicitação de boleto - ${name} `)
      })
    } catch (error) {
      console.log(error)
    }
  }
}
