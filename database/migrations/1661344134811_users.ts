import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('username').notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('cpf', 14).notNullable()
      table.string('remember_me_token').nullable()
      table.boolean('is_staff').defaultTo(true)
      table.boolean('is_active').defaultTo(true)
      table
        .integer('created_by_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .notNullable()
      table
        .integer('last_edit_by_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
