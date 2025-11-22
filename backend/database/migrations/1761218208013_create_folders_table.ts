import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'folders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table
        .integer('parent_id')
        .unsigned()
        .references('id')
        .inTable('folders')
        .onDelete('CASCADE')
        .nullable()
      table
        .integer('collection_number')
        .references('id')
        .inTable('folders')
        .onDelete('CASCADE')
        .nullable()
      table.timestamp('created_at').nullable()

      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
