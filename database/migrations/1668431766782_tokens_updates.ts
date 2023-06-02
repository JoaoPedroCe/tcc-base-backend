import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tokens'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('associate_id')
        .unsigned()
        .references('id')
        .inTable('associates')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
