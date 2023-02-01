import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public userId: number

  @column()
  public title: string
  @column()
  public content: string | null
  @column()
  public recap: string | null
  @column()
  public online: boolean
  @column()
  public thumbnail: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
