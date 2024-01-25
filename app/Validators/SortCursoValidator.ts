import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SortCursoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    sortBy: schema.enum.optional(['id', 'nombre', 'createdAt', 'updatedAt']),
    order: schema.enum.optional(['asc', 'desc'] as const),
  })

  public messages = {}
}
