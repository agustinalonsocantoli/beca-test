import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCursoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string.optional(),
    icono: schema.string.optional(),
    publicado: schema.boolean(),
  })

  public messages = {}
}
