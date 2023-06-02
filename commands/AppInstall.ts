import { BaseCommand } from '@adonisjs/core/build/standalone'
import execa from 'execa'

export default class AppInstall extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'app:install'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    this.logger.info('Instalação iniciada')
    await execa.node('ace', ['migration:run'])
    this.logger.info('Executado com sucesso todas as migrations')
    await execa.node('ace', ['db:seed', '-f', 'database/seeders/RoleSeeder.ts'])
    await execa.node('ace', ['db:seed', '-f', 'database/seeders/UserSeeder.ts'])
    await execa.node('ace', ['db:seed', '-f', 'database/seeders/CountrySeeder.ts'])
    await execa.node('ace', ['db:seed', '-f', 'database/seeders/StateSeeder.ts'])
    await execa.node('ace', ['db:seed', '-f', 'database/seeders/AssociateSeeder.ts'])
    this.logger.info('Executado com sucesso todos os seeders')
    this.logger.success('Instalação finalizada com sucesso!')
  }
}
