import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class UserFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof User, User>

  public nombre(nombre: string) {
    this.$query.whereRaw("unaccent(nombre) ILIKE '%" + nombre + "%'")
  }
}
