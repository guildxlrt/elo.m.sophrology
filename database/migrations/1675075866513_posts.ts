import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()

      table.string('title').notNullable()
      table.text('content', 'text').nullable()
      table.boolean('status').notNullable().defaultTo(false)
      table.string('thumbnail').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
