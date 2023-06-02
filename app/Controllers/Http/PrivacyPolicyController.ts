import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FOLDER_FILE_UPLOAD } from 'App/constants'
import PrivacyPolicy from 'App/Models/PrivacyPolicy'

export default class PrivacyPolicyController {
  public async index() {
    const privacyPolicy = PrivacyPolicy.query().first()
    return privacyPolicy
  }

  public async store({ auth, request }: HttpContextContract) {
    const nextPrivacyPolicy = await request.file('file')
    const privacyPolicy = await PrivacyPolicy.create({
      fileUrl: nextPrivacyPolicy?.clientName,
      createdById: auth.user?.id,
    })

    await nextPrivacyPolicy?.move(Application.tmpPath(`${FOLDER_FILE_UPLOAD}/privacy_policy`), {
      name: 'politica_privacidade.pdf',
      overwrite: true,
    })

    return privacyPolicy
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const privacyPolicy = await PrivacyPolicy.findOrFail(id)

    await privacyPolicy.delete()

    return response.json('Registro excluido com sucesso')
  }
}
