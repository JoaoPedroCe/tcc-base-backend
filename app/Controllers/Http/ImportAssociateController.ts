import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import ImportAssociateExcelService from 'App/Services/ImportAssociateExcelService'
import * as path from 'path'
import Associate from 'App/Models/Associate'

import ImportAssociateValidator from 'App/Validators/ImportAssociate/Store'
import I18n from 'App/i18n/pt-BR'
import State from 'App/Models/State'
import { DateTime } from 'luxon'
import { cellphoneMask, cepMask, cpfMask, maskString, phoneMask } from 'App/utils/masks'

export default class ImportAssociatesController {
  public async store({ request, response }: HttpContextContract) {
    const importAssociates = await request.validate(ImportAssociateValidator)
    const errorsResponse: Array<string> = []
    const pathFile = path.resolve(
      Application.tmpPath(`uploads/files/excel_tmp/${importAssociates.fileName}`)
    )

    const nextAssociates = await ImportAssociateExcelService(pathFile)
    const associatesToImport = await Promise.all(
      nextAssociates.map(async (associate: Associate | any) => {
        if (associate.error) return errorsResponse.push(associate)
        let state: State | undefined
        if (associate.stateId)
          state =
            (await State.query().where({ abbreviation: associate.stateId }).first()) || undefined
        if (state !== undefined) {
          return {
            ...associate,
            cpf: maskString(associate.cpf.toString(), cpfMask),
            stateId: state.id,
            birthDate:
              associate.birthDate !== undefined
                ? DateTime.fromISO(associate.birthDate).toFormat('yyyy-MM-dd')
                : '',
            zipCode:
              associate.zipCode !== undefined
                ? maskString(associate.zipCode.toString(), cepMask)
                : '',
            phone:
              associate.phone !== undefined
                ? maskString(associate.phone.toString(), phoneMask)
                : '',
            cellphone: maskString(associate.cellphone.toString(), cellphoneMask),
            password: associate.password,
          }
        } else {
          return {
            ...associate,
            cpf: maskString(associate.cpf.toString(), cpfMask),
            birthDate:
              associate.birthDate !== undefined
                ? DateTime.fromISO(associate.birthDate).toFormat('yyyy-MM-dd')
                : '',
            zipCode:
              associate.zipCode !== undefined
                ? maskString(associate.zipCode.toString(), cepMask)
                : '',
            phone:
              associate.phone !== undefined
                ? maskString(associate.phone.toString(), phoneMask)
                : '',
            cellphone: maskString(associate.cellphone.toString(), cellphoneMask),
            password: associate.password,
          }
        }
      })
    )
    associatesToImport.forEach(async (item) => {
      const existing = await Associate.query().where({ email: item.email, cpf: item.cpf }).first()
      if (existing) {
        await existing.merge(item).save()
      } else {
        await Associate.create(item)
      }
    })

    if (errorsResponse.length > 0) {
      return response.status(400).json(errorsResponse)
    }

    return response.json({ importation: I18n.import.sucess.importantion })
  }
}
