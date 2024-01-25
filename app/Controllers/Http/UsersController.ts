import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const page = request.input('page', 1) ?? 1
      const limit = request.input('limit', 10) ?? 10

      const data = await User.filter(request.qs()).paginate(page, limit)

      response.ok({
        data: data,
      })
    } catch (e) {
      response.badRequest(e)
    }
  }
  public async show({ response, params: { id } }: HttpContextContract) {
    try {
      const data = await User.query(id).where('id', id).firstOrFail()

      response.ok({
        data: data,
      })
    } catch (e) {
      response.badRequest()
    }
  }
  public async store({ response, request }: HttpContextContract) {
    try {
      const validatedData = await request.validate(CreateUserValidator)

      const data = await User.create(validatedData)

      response.ok({
        data: data,
      })
    } catch (e) {
      console.log(e)
      response.badRequest(e)
    }
  }
  public async update({ params: { id }, response, request }: HttpContextContract) {
    try {
      const validatedData = await request.validate(UpdateUserValidator)

      const data = await User.findOrFail(id)
      data.merge(validatedData)

      await data.save()

      response.ok({
        data: data,
      })
    } catch (e) {
      console.log(e)
      response.badRequest(e)
    }
  }
  public async destroy({ response, params: { id } }: HttpContextContract) {
    try {
      const data = await User.findOrFail(id)
      data.delete()
      response.ok({
        data: data,
      })
    } catch (e) {
      response.badRequest()
    }
  }
}
