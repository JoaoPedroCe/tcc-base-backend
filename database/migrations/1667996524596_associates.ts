import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { GenreType } from 'App/Models/User'

export default class extends BaseSchema {
  protected tableName = 'associates'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('avatar_url').nullable()
      table.string('cpf', 14).notNullable().unique()
      table.string('genre').defaultTo(GenreType.male).nullable()
      table.string('zip_code', 9).nullable()
      table.string('company', 300).nullable()
      table.integer('associate_number').nullable()
      table.date('birth_date').nullable()
      table.string('address').nullable()
      table.integer('address_number').nullable()
      table.string('complement').nullable()
      table.string('city').nullable()
      table.string('cellphone', 15).nullable()
      table.string('phone', 14).nullable()
      table.boolean('is_active').defaultTo(true)
      table.string('remember_me_token').nullable()
      table.boolean('is_from_the_category').defaultTo(false)
      table.boolean('is_volunteer_partner').defaultTo(false)
      table.boolean('accepted_terms').defaultTo(false)
      table.timestamp('accepted_terms_date', { useTz: true }).nullable()
      table.integer('state_id').unsigned().references('id').inTable('states').onDelete('SET NULL')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
