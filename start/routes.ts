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

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// })

Route.get('/', 'HomeController.index').as('home')
Route.get('/presentation', 'HomeController.about').as('about')
Route.get('/les-seances-de-sophrologie', 'HomeController.sessions').as('sessions')

Route.post('/message', 'MessagesController.send').as('message')

Route.get('/dashboard', 'UsersController.dashboard').as('dashboard')
Route.post('/login', 'UsersController.login').as('login')
Route.delete('/logout', 'UsersController.logout').as('logout')

Route.get('/blog', 'PostsController.blog').as('blog')
Route.get('/blog/:id', 'PostsController.article').as('get.article')
Route.post('/blog/new', 'PostsController.new').as('new.article')
Route.post('/blog/:id/update', 'PostsController.update').as('update.article')
Route.patch('/blog/:id/status', 'PostsController.status').as('status.article')
Route.delete('/blog/:id/delete', 'PostsController.delete').as('delete.article')
