import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

export default class CollectiveAgreementFileController {
  public async store({ request }: HttpContextContract) {
    const collectiveAgreementFile = await request.file('file')

    await collectiveAgreementFile?.move(
      Application.tmpPath('uploads/files/collective_agreements_tmp'),
      { name: `${Date.now()}.pdf`, overwrite: false }
    )
    return collectiveAgreementFile
  }

  public async update({ request }: HttpContextContract) {
    const collectiveAgreementFile = await request.file('file')
    await collectiveAgreementFile?.move(
      Application.tmpPath('uploads/files/collective_agreements_tmp'),
      { name: `${Date.now()}.pdf`, overwrite: false }
    )

    return collectiveAgreementFile
  }
}
