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

Route.get('/', 'PagesController.index').as('home')
Route.get('/presentation', 'PagesController.about').as('about')
Route.get('/les-seances-de-sophrologie', 'PagesController.sessions').as('sessions')
Route.get('/user', 'PagesController.user').as('user')
Route.get('/conditions', 'PagesController.conditions').as('conditions')

Route.get('/blog', 'PagesController.blog').as('blog')
Route.get('/blog/:url_path', 'PagesController.post').as('get.post')
Route.get('/blog/:id/:content_type', 'PagesController.post').as('new.post')

Route.group(() => {
  Route.post('/blog/new', 'PostsController.new')
  Route.post('/blog/:id/update', 'PostsController.update')
  Route.patch('/blog/:id/status', 'PostsController.status')
  Route.delete('/blog/:id/before-delete', 'PostsController.beforeDelete')
  Route.delete('/blog/:id/delete', 'PostsController.delete')

  Route.get('/password', 'PagesController.password').as('password')
  Route.post('/password-change', 'UsersController.passwordChange').as('password.change')
}).middleware('auth')

Route.post('/message', 'MessagesController.send')

Route.post('/subscribe', 'NewsletterController.subscribe')
Route.post('/unsubscribe', 'NewsletterController.unsubscribe')
Route.post('/resubscribe', 'NewsletterController.resubscribe')

Route.post('/create', 'UsersController.create').as('create')
Route.post('/login', 'UsersController.login').as('login')
Route.delete('/logout', 'UsersController.logout').as('logout')
