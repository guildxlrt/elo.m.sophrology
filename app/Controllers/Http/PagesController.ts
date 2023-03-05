import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import dateFormat from 'App/Utils/Functions'
import { PostDateType } from '../../Utils/Types'
import { allowNewUsr } from './UsersController'

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

    const posts = await Post.query().where('status', true)

    console.log(posts)

    return view.render('pages/blog', { posts: posts.reverse(), user: user })
  }

  async post({ params, view, auth, response, session, bouncer }: HttpContextContract) {
    let user = false
    let author = false

    if (auth.user !== undefined) {
      user = auth.user.id
    }

    if (params.id === 'new') {
      if (auth.user === undefined) {
        session.flash({ alert: 'Vous devez etre connecte pour rediger' })

        return response.redirect().toPath('/user')
      } else {
        const post = {
          id: params.id,
          content_type: params.content_type,
        }

        return view.render('pages/post', { post, user: user })
      }
    } else {
      const post = await Post.findByOrFail('url_path', params.url_path)

      if (auth.user !== undefined && (await bouncer.allows('editPost', post)) === true) {
        author = true
      }

      post.createdAt = dateFormat(post.createdAt, PostDateType.createdAt)
      post.updatedAt = dateFormat(post.updatedAt, PostDateType.updatedAt)

      return view.render('pages/post', {
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
      const posts = await Post.query().where('user_id', user)

      posts?.map((post: Post | null) => {
        post.createdAt = dateFormat(post.createdAt, PostDateType.createdAt).slice(7)
        if (post.updatedAt !== null)
          post.updatedAt = dateFormat(post.updatedAt, PostDateType.updatedAt).slice(7)
      })

      return view.render('pages/user', {
        user: user,
        allowNewUsr: allowNewUsr,
        posts: posts.reverse(),
      })
    } else {
      const posts = null

      return view.render('pages/user', {
        user: user,
        allowNewUsr: allowNewUsr,
        posts: posts,
      })
    }
  }

  async conditions({ view, auth }: HttpContextContract) {
    let user = false

    if (auth.user !== undefined) {
      user = auth.user.id
    }

    return view.render('pages/conditions', { user: user })
  }
}
