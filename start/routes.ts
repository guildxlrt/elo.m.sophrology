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

Route.get('/', 'PagesController.index')
Route.get('/presentation', 'PagesController.about')
Route.get('/les-seances-de-sophrologie', 'PagesController.sessions')
Route.get('/blog', 'PagesController.blog').as('blog')
Route.get('/blog/:id', 'PagesController.article').as('get.article')
Route.get('/dashboard', 'PagesController.dashboard').as('dashboard')

Route.group(() => {
  Route.post('/blog/new', 'PostsController.new')
  Route.post('/blog/:id/update', 'PostsController.update')
  Route.patch('/blog/:id/status', 'PostsController.status')
  Route.delete('/blog/:id/delete', 'PostsController.delete')
}).middleware('auth')

Route.post('/message', 'MessagesController.send')

Route.post('/create', 'UsersController.create')
Route.post('/login', 'UsersController.login').as('login')
//Route.delete('/logout', 'UsersController.logout')
