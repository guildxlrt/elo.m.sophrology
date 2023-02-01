import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from '../../Models/Post'

export default class BlogsController {
  async blog({ view }: HttpContextContract) {
    const posts = await Post.all()
    return view.render('pages/blog', { posts })
  }
  async article({ params, view }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    return view.render('pages/article', { post })
  }
}
