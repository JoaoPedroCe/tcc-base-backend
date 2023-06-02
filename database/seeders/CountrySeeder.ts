import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Country from 'App/Models/Country'

export default class extends BaseSeeder {
  public async run() {
    await Country.create({
      id: 76,
      name: 'Brasil',
      createdById: 1,
      lastEditById: 1,
    })
  }
}
