import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export const ROLES = {
  root: {
    id: 1,
    name: 'Root',
  },
  admin: {
    id: 2,
    name: 'Administrador',
  },
  moderator: {
    id: 3,
    name: 'Moderador',
  },
  editor: {
    id: 9,
    name: 'Editor',
  },
  user: {
    id: 10,
    name: 'Usuário',
  },
}

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string
}
