import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DeviceToken from 'App/Models/DeviceToken'
import DeviceTokenValidator from 'App/Validators/DeviceToken/Store'

export default class DeviceTokensController {
  public async store({ request }: HttpContextContract) {
    const nextDeviceToken = await request.validate(DeviceTokenValidator)
    const deviceToken = await DeviceToken.create(nextDeviceToken)
    return deviceToken
  }
}
