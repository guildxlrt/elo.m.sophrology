import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { PostType } from 'App/Types/Types'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public updatedAt: DateTime | null

  @column()
  public content_type: PostType

  @column()
  public title: string
  @column()
  public content: string
  @column()
  public cover: string | null

  @column()
  public status: boolean

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  @column()
  public user_id: number
}
