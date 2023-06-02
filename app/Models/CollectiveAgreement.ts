import { DateTime } from 'luxon'
import { afterDelete, afterSave, BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import CollectiveAgreementFilter from './Filters/CollectiveAgreementFilter'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import Drive from '@ioc:Adonis/Core/Drive'

export default class CollectiveAgreement extends compose(BaseModel, Filterable) {
  public static $filter = () => CollectiveAgreementFilter
  @column({ isPrimary: true })
  public id: number

  @column()
  public companyName: string

  @column()
  public collectiveAgreementName: string

  @column()
  public fileName: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @afterSave()
  public static async moveFile(collectiveAgreement: CollectiveAgreement) {
    if (!(await Drive.exists(`collective_agreements_tmp/${collectiveAgreement.fileName}`))) return
    await Drive.move(
      `collective_agreements_tmp/${collectiveAgreement.fileName}`,
      `collective_agreements/${collectiveAgreement.id}/collective_agreement.pdf`
    ),
      { overwrite: true }
  }

  @afterDelete()
  public static async deleteFile(collectiveAgreement: CollectiveAgreement) {
    await Drive.delete(`collective_agreements/${collectiveAgreement.id}`)
  }
}
