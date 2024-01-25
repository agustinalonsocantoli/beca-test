import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import UserFilter from './Filters/UserFilter'

export default class User extends compose(BaseModel, Filterable) {
  public static table = 'users'
  public static $filter = () => UserFilter
  public serializeExtras = true

  public get meta() {
    return this.$extras
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column()
  public nombre: string

  @column()
  public apellidos: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    user.email = user.email.toLowerCase()
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
