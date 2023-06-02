import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

export default class ImportAssociatesController {
  public async store({ request }: HttpContextContract) {
    const importAssociatesFile = await request.file('file')

    await importAssociatesFile?.move(Application.tmpPath('uploads/files/excel_tmp/'), {
      name: `${Date.now()}.xlsx`,
    })

    return importAssociatesFile
  }
}
