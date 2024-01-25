import { DateTime } from 'luxon'
import { BaseModel, column, scope } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import CursoFilter from './Filters/CursoFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'

export default class Curso extends compose(BaseModel, Filterable) {
  public static table = 'cursos'
  public static $filter = () => CursoFilter
  public serializeExtras = true

  @column({ isPrimary: true })
  public id: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['nombre'],
    allowUpdates: true,
  })
  public slug: string

  @column()
  public nombre: string

  @column()
  public icono: string

  @column()
  public publicado: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static published = scope((query) => {
    query.where('publicado', true)
  })
}
