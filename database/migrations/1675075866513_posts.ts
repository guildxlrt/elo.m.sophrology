import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()

      table
        .enu('content_type', ['ARTICLE', 'VIDEO'], {
          useNative: true,
          enumName: 'post_content_type',
          existingType: false,
          schemaName: 'public',
        })
        .notNullable()

      table.string('title').notNullable()
      table.text('content', 'text').notNullable()
      table.string('cover').nullable()

      table.boolean('status').notNullable().defaultTo(false)
    })
  }

  public async down() {
    this.schema.raw('DROP TYPE IF EXISTS "post_content_type"')
    this.schema.dropTable(this.tableName)
  }
}
