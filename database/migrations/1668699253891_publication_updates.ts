import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'publications'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('city')
      table.integer('state_id').unsigned().references('id').inTable('states').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
