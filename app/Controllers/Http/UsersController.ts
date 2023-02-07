import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  async dashboard({ view }: HttpContextContract) {
    return view.render('pages/dashboard')
  }

  async login({ request }: HttpContextContract) {
    return `post : loged in`
  }
  async logout({ request }: HttpContextContract) {
    return `delete : loged out`
  }
}
