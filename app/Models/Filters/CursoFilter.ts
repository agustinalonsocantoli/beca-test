import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Curso from 'App/Models/Curso'

export default class CursoFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Curso, Curso>

  public nombre(nombre: string) {
    this.$query.whereRaw("unaccent(nombre) ILIKE '%" + nombre + "%'")
  }

  public publicado(publicado: boolean) {
    this.$query.where('publicado', publicado)
  }
}
