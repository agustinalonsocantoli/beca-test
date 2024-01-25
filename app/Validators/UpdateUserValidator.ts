import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string.optional(),
    nombre: schema.string.optional(),
    apellidos: schema.string.optional(),
    password: schema.string.optional({ trim: true }, [rules.minLength(8)]),
  })

  public messages = {}
}
