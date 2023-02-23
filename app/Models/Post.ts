import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  @column()
  public user_id: number

  @column()
  public title: string
  @column()
  public content: string | null
  @column()
  public status: boolean
  @column()
  public thumbnail: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public updatedAt: DateTime | null
}
