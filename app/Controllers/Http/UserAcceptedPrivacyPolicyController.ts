import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserAcceptedPrivacyPolicy from 'App/Models/UserAcceptedPrivacyPolicy'

export default class UserAcceptedPrivacyPolicyController {
  public async store({ auth }: HttpContextContract) {
    const privacyPolicy = await UserAcceptedPrivacyPolicy.create({
      userId: auth.user?.id,
    })

    return privacyPolicy
  }
}
