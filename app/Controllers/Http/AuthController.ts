import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class AuthController {
  public async register({ response, request, auth }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)

    const user = await User.create(data)

    await auth.login(user)

    return response.ok({
      message: 'Usuario registrado',
      data: auth.user,
    })
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { user, password } = request.all()

    const data = await User.query().where('email', user).orWhere('username', user)
    if (!data) return response.notFound({ data: 'Usuario no encontrado' })

    try {
      const token = await auth.use('api').attempt(user, password, { expiresIn: '30 days' })
      if (auth.user) return { token: token, data: auth.user }
    } catch (error) {
      console.log('error' + error)
      return response.unauthorized({ data: error })
    }
  }
}
