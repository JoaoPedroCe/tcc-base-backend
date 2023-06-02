import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

export default class PublicationLinkController {
  public async store({ request }: HttpContextContract) {
    const publicationsFile = await request.file('file')

    await publicationsFile?.move(Application.tmpPath('uploads/files/publications_tmp'), {
      overwrite: false,
      name: `${Date.now()}_${publicationsFile.clientName}`,
    })
    return publicationsFile
  }

  public async update({ request }: HttpContextContract) {
    const publicationsFile = await request.file('file')
    if (publicationsFile) {
      await publicationsFile?.move(Application.tmpPath('uploads/files/publications_tmp'), {
        overwrite: false,
      })
    }
    return publicationsFile
  }
}
