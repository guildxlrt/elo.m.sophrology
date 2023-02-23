import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  async new({ request, auth }: HttpContextContract) {
    const data = await request.validate(PostValidator)
    const post = await Post.create({
      ...data,
      status: true,
      user_id: auth.user.id,
    })
    post.save()

    const id = post.$attributes.id

    return {
      id: id,
      created: true,
      msg: `L'article a ete sauvegarde et publie`,
    }
  }

  async update({ params, request, bouncer }: HttpContextContract) {
    const id = params.id
    const data = await request.validate(PostValidator)

    const post = await Post.findOrFail(id)
    if ((await bouncer.allows('editPost', post)) === true) {
      post
        .merge({
          ...data,
        })
        .save()

      return {
        id: id,
        new: false,
        msg: `L'article a ete mit a jour`,
      }
    } else {
      return {
        id: id,
        new: false,
        msg: `Cet article n'est pas le votre`,
      }
    }
  }

  async status({ params, response, bouncer }: HttpContextContract) {
    const id = params.id

    const post = await Post.findOrFail(id)

    if ((await bouncer.allows('editPost', post)) === true) {
      post
        .merge({
          status: !post.status,
        })
        .save()

      return response.status(200).json(post.status)
    } else return response.status(401).json('Acces non authorise')
  }

  async beforeDelete({ params, bouncer }: HttpContextContract) {
    const id = params.id

    const post = await Post.findOrFail(id)
    if ((await bouncer.allows('editPost', post)) === true) {
      return { authorized: true }
    } else return { authorized: false }
  }

  async delete({ params, response, bouncer }: HttpContextContract) {
    const id = params.id

    const post = await Post.findOrFail(id)
    if ((await bouncer.allows('editPost', post)) === true) {
      post.delete()
      return response.status(200).json("L'article a ete supprime.")
    } else return response.status(401).json("Cet article n'est pas le votre")
  }
}
