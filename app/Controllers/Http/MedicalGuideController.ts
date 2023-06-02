import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MedicalGuide from 'App/Models/MedicalGuide'
import MedicalGuideValidator from 'App/Validators/MedicalGuide/Update'

export default class MedicalGuideController {
  public async index({ request }: HttpContextContract) {
    const { sortColumn = 'city', sortType = 'asc' } = request.all()

    const query = MedicalGuide.filter(request.all())

    if (sortColumn) {
      query.orderBy(sortColumn, sortType)
    }

    const collectiveAgreements = await query.finally()

    return collectiveAgreements
  }

  public async store({ request, auth }: HttpContextContract) {
    const { cities } = await request.validate(MedicalGuideValidator)

    await MedicalGuide.query().delete()
    const medicalGuide = await MedicalGuide.createMany(
      cities.map(({ nome, microrregiao }) => ({
        city: nome,
        state: microrregiao.mesorregiao.UF.nome,
        created_by_id: auth.user?.id,
        last_edit_by_id: auth.user?.id,
      }))
    )

    return medicalGuide
  }
}
