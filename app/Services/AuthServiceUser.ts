import User from 'App/Models/User'

type LoginResponse = {
  user: User
  token: string
}

export default class AuthServiceUser {
  public static async login({ email, password, auth }): Promise<LoginResponse> {
    const { token } = await auth.attempt(email, password)

    const user = await User.query().where({ email, isStaff: true }).firstOrFail()

    return { user, token }
  }

  public static async register({ name, email, password }) {
    await User.create({
      name,
      email,
      password,
    })
  }
}
