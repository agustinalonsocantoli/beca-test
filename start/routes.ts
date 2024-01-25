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

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.group(() => {
  Route.post('login', 'AuthController.login').as('login')
  Route.post('register', 'AuthController.register').as('register')
})
  .prefix('v1/auth')
  .as('auth')

Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly()
  Route.resource('cursos', 'CursosController').apiOnly()
})
  .middleware(['auth'])
  .prefix('v1/admin')
  .as('admin')

Route.group(() => {
  Route.get('cursos', 'CursosController.index').as('examenes')
  Route.get('cursos/:slug', 'CursosController.showBySlug').as('examenes/:slug')
})
  .prefix('v1/web')
  .as('web')
