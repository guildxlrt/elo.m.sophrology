import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public surname: string
  @column()
  public name: string
  @column()
  public email: string
  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
