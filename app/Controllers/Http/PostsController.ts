import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from '../../Models/Post'
import PostValidator from '../../Validators/PostValidator'

export default class BlogsController {
  async new({ request }: HttpContextContract) {
    const data = await request.validate(PostValidator)

    const post = await Post.create({
      ...data,
      status: true,
    })
    post.save()

    const id = post.$attributes.id
    return {
      id: id,
      created: true,
      msg: `L'article a ete sauvegarde et publie`,
    }
  }

  async update({ params, request }: HttpContextContract) {
    const id = params.id
    const data = await request.validate(PostValidator)

    const post = await Post.findOrFail(id)
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
  }

  async status({ params, response }: HttpContextContract) {
    const id = params.id

    const post = await Post.findOrFail(id)
    const newStatus = !post.status
    post
      .merge({
        status: newStatus,
      })
      .save()

    return response.json(post.status)
  }

  async delete({ params }: HttpContextContract) {
    const id = params.id

    const post = await Post.findOrFail(id)
    post.delete()

    return `L'article a ete supprime.`
  }
}
