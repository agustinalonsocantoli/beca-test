import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string(),
    nombre: schema.string(),
    apellidos: schema.string(),
    email: schema.string([
      rules.email(),
      rules.trim(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [rules.minLength(8)]),
  })

  public messages = {}
}
