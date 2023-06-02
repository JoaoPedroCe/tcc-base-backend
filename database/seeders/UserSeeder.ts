import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ROLES } from 'App/Models/Role'

import User from 'App/Models/User'
import UserRole from 'App/Models/UserRole'

export default class extends BaseSeeder {
  public async run() {
    const admin = await User.create({
      name: 'Admin',
      username: 'Admin',
      isStaff: true,
      isActive: true,
      email: 'admin@admin.br',
      password: 'admin123',
      cpf: '604.215.580-67',
      createdById: 1,
      lastEditById: 1,
    })

    await UserRole.query().where({ userId: admin.id }).update({
      roleId: ROLES.root.id,
    })
  }
}
