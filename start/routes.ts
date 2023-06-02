/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: process.env.APP_NAME }
})

Route.group(() => {
  Route.post('login', 'AuthUserController.login').as('auth.user.login')
  Route.post('register', 'AuthUserController.register').as('auth.user.register')
  Route.post('forgot', 'AuthUserController.forgot').as('auth.user.forgot')
  Route.post('reset', 'AuthUserController.reset').as('auth.user.reset')
})
  .prefix('/auth')
  .as('auth')

Route.group(() => {
  Route.post('login', 'AuthAssociateController.login').as('auth.associate.login')
  Route.post('register', 'AuthAssociateController.register').as('auth.associate.register')
  Route.post('forgot', 'AuthAssociateController.forgot').as('auth.associate.forgot')
  Route.post('reset', 'AuthAssociateController.reset').as('auth.associate.reset')
})
  .prefix('/authApp')
  .as('authApp')

Route.group(() => {
  Route.resource('preRegistration', 'PreRegistrationController').only(['store'])
})
  .prefix('/app')
  .as('app')

Route.group(() => {
  Route.resource('users', 'UserController').middleware({ '*': ['auth'] })
  Route.resource('privacyPolicy', 'PrivacyPolicyController')
  Route.resource('userAcceptedPrivacyPolicy', 'UserAcceptedPrivacyPolicyController')
  Route.resource(
    'associateAcceptedPrivacyPolicy',
    'AssociateAcceptedPrivacyPolicyController'
  ).middleware({
    store: ['auth:associate'],
  })

  Route.resource('associates', 'AssociateController')
  Route.resource('countries', 'CountryController')
  Route.resource('states', 'StateController')

  Route.resource('medicalGuide', 'MedicalGuideController').only(['index', 'store'])

  Route.resource('publications', 'PublicationController')
  Route.resource('publications.links', 'PublicationLinkController')
  Route.resource('publicationsFile', 'PublicationFileController')

  Route.resource('collectiveAgreements', 'CollectiveAgreementController')
  Route.resource('collectiveAgreementsFile', 'CollectiveAgreementFileController')
  Route.resource('importAssociatesFile', 'ImportAssociateFileController').only(['store'])
  Route.resource('importAssociates', 'ImportAssociateController').only(['store'])
  Route.resource('joinSindalquim', 'JoinSindalquimController').only(['store'])
  Route.resource('judiciary', 'JudiciaryController').only(['store'])
  Route.resource('medicalGuideSolicitation', 'MedicalGuideSolicitationController').only(['store'])
  Route.resource('bankPayment', 'BankPaymentController').only(['store'])
  Route.resource('deviceToken', 'DeviceTokensController').only(['store'])
  Route.resource('vehicle', 'VehiclesController')
})
  .prefix('admin')
  .middleware(['auth:user,associate'])
