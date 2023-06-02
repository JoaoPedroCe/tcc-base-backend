import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import RoleModel, { ROLES } from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    await RoleModel.createMany(Object.values(ROLES))
  }
}
