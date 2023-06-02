import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehicles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('associate_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('associates')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('model', 255)
      table.string('year', 255)
      table.string('brand', 255)
      table.string('annotations', 255)
      table.string('plate', 255)
      table.string('category', 255)
      table.string('document', 255)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
