import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PagesController {
  async index({ view, auth }: HttpContextContract) {
    let user = false
    if (auth.user !== undefined) {
      user = auth.user.id
    }
    return view.render('pages/index', { user: user })
  }
  async about({ view, auth }: HttpContextContract) {
    let user = false
    if (auth.user !== undefined) {
      user = auth.user.id
    }
    return view.render('pages/about', { user: user })
  }
  async sessions({ view, auth }: HttpContextContract) {
    let user = false
    if (auth.user !== undefined) {
      user = auth.user.id
    }
    return view.render('pages/sessions', { user: user })
  }

  async blog({ view, auth }: HttpContextContract) {
    let user = false
    if (auth.user !== undefined) {
      user = auth.user.id
    }

    const posts = await Post.all()
    return view.render('pages/blog', { posts, user: user })
  }

  async article({ params, view, auth, response, session, bouncer }: HttpContextContract) {
    if (params.id === 'new') {
      if (auth.user === undefined) {
        session.flash({ alert: 'Vous devez etre connecte pour rediger' })
        return response.redirect().toPath('/user')
      } else {
        let user = false
        if (auth.user !== undefined) {
          user = auth.user.id
        }
        const post = { id: 'new' }
        return view.render('pages/article', { post, user: user })
      }
    } else {
      const post = await Post.findOrFail(params.id)

      let user = false
      let author = false

      if (auth.user !== undefined) {
        user = auth.user.id

        if ((await bouncer.allows('editPost', post)) === true) {
          author = true
        }
      }

      return view.render('pages/article', {
        post,
        user: user,
        isAuthor: author,
      })
    }
  }

  async user({ view, auth }: HttpContextContract) {
    let user = false
    if (auth.user !== undefined) {
      user = auth.user.id
    }

    return view.render('pages/user', { user: user })
  }
}
