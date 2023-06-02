import Token from 'App/Models/Token'
import { DateTime } from 'luxon'

const { randomBytes } = require('crypto')
const { promisify } = require('util')

export default class TokenService {
  public static async create(userId: number, type: string): Promise<string> {
    const radom = await promisify(randomBytes)(16)
    const token = (await radom.toString('hex')) as string

    await Token.create({
      userId,
      token,
      type,
      expiresAt: DateTime.now().plus({ hours: 2 }),
    })

    return token
  }
}
