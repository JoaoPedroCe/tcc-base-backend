import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Associate from 'App/Models/Associate'
import { ROLES } from 'App/Models/Role'

import UserRole from 'App/Models/UserRole'

export default class extends BaseSeeder {
  public async run() {
    const associate = await Associate.create({
      name: 'Associado',
      associateNumber: 134,
      email: 'associate@sindalquim.br',
      password: 'associate',
      cpf: '604.215.580-67',
      company: 'Sindalquim',
      zipCode: '95084-300',
      city: 'Caxias do Sul',
      address: 'Rua Luiz Rossi',
      complement: 'Exposição',
      genre: 'male',
      cellphone: '21 98586-4732',
      addressNumber: 45,
      stateId: 43,
    })

    await UserRole.query().where({ associateId: associate.id }).update({
      roleId: ROLES.user.id,
    })
  }
}
