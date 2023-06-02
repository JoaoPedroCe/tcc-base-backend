import Associate from 'App/Models/Associate'

type LoginResponse = {
  associate: Associate
  token: string
}

export default class AuthServiceAssociate {
  public static async login({ cpf, password, auth }): Promise<LoginResponse> {
    const { token } = await auth.use('associate').attempt(cpf, password)

    const associate = await Associate.query().where({ cpf }).firstOrFail()

    return { associate, token }
  }

  public static async register({ name, email, password }) {
    await Associate.create({
      name,
      email,
      password,
    })
  }
}
