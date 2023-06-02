import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'join_sindalquim_emails'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255)
      table.string('admission_date', 255)
      table.string('birth_date', 255)
      table.string('cellphone', 255)
      table.string('cep', 255)
      table.string('address', 255)
      table.string('city', 255)
      table.string('company_name', 255)
      table.string('complement', 255)
      table.string('cpf', 255)
      table.string('district', 255)
      table.string('genre', 255)
      table.string('marital_status', 255)
      table.string('number', 255)
      table.string('office_or_function', 255)
      table.string('phone', 255)
      table.string('rg', 255)
      table.string('uf', 255)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
