import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  async index({ view }: HttpContextContract) {
    return view.render('pages/index')
  }
  async about({ view }: HttpContextContract) {
    return view.render('pages/about')
  }
  async sessions({ view }: HttpContextContract) {
    return view.render('pages/sessions')
  }
}
