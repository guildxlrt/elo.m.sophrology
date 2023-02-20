import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from '../../Models/Post'

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

  async blog({ view }: HttpContextContract) {
    const posts = await Post.all()
    return view.render('pages/blog', { posts })
  }

  async article({ params, view }: HttpContextContract) {
    if (params.id === 'new') {
      const post = { id: 'new' }
      return view.render('pages/article', { post })
    } else {
      const post = await Post.findOrFail(params.id)
      return view.render('pages/article', { post })
    }
  }

  async dashboard({ view }: HttpContextContract) {
    return view.render('pages/dashboard')
  }
}
