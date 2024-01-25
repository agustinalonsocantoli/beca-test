import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Curso from 'App/Models/Curso'
import CreateCursoValidator from 'App/Validators/CreateCursoValidator'
import SortCursoValidator from 'App/Validators/SortCursoValidator'
import UpdateCursoValidator from 'App/Validators/UpdateCursoValidator'

export default class CursosController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const page = request.input('page', 1) ?? 1
      const limit = request.input('limit', 10) ?? 10
      const validateSort = await request.validate(SortCursoValidator)

      const sortBy = validateSort.sortBy || 'createdAt'
      const order = validateSort.order || 'desc'

      const data = await Curso.filter(request.qs())
        .withScopes((scope: any) => scope.published())
        .orderBy(sortBy, order)
        .paginate(page, limit)

      response.ok({
        data: data,
      })
    } catch (e) {
      console.log(e)
      response.badRequest(e)
    }
  }

  public async show({ response, params: { id } }: HttpContextContract) {
    try {
      const data = await Curso.query(id).where('id', id).firstOrFail()

      response.ok({
        data: data,
      })
    } catch (e) {
      response.badRequest()
    }
  }

  public async showBySlug({ params: { slug }, response }: HttpContextContract) {
    try {
      const data = await Curso.query().where({ slug }).firstOrFail()

      response.ok({
        data: data,
      })
    } catch (e) {
      console.log(e)
      response.badRequest()
    }
  }

  public async store({ response, request }: HttpContextContract) {
    try {
      const validatedData = await request.validate(CreateCursoValidator)

      const data = await Curso.create(validatedData)

      response.ok({
        data: data,
      })
    } catch (e) {
      response.badRequest(e)
    }
  }

  public async update({ params: { id }, response, request }: HttpContextContract) {
    try {
      const data = await Curso.findOrFail(id)
      const validatedData = await request.validate(UpdateCursoValidator)

      data.merge(validatedData)

      await data.save()

      response.ok({
        data: data,
      })
    } catch (e) {
      response.badRequest(e)
    }
  }

  public async destroy({ response, params: { id } }: HttpContextContract) {
    try {
      const data = await Curso.findOrFail(id)

      data.delete()

      response.ok({
        data: data,
      })
    } catch (e) {
      response.badRequest()
    }
  }
}
