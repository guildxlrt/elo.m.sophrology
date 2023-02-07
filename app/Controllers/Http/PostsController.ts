import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from '../../Models/Post'

export default class BlogsController {
  async blog({ view }: HttpContextContract) {
    const posts = await Post.all()
    return view.render('pages/blog', { posts })
  }

  async article({ params, view }: HttpContextContract) {
    if (params.id === 'new') {
      const post = { id: 'new', title: "Titre de l'article", content: "Contenu de l'article" }
      return view.render('pages/article', { post })
    } else {
      const post = await Post.findOrFail(params.id)
      return view.render('pages/article', { post })
    }
  }

  async new({ request, response }: HttpContextContract) {
    const { title, content } = request.body()

    const post = await Post.create({
      title: title,
      content: content,
      status: true,
    })
    post.save()

    const id = post.$attributes.id
    return response.redirect(`/blog/${id}`)
  }

  async update({ params, request, response }: HttpContextContract) {
    const id = params.id
    const { title, content } = request.body()

    const post = await Post.findOrFail(id)
    post
      .merge({
        title: title,
        content: content,
      })
      .save()

    return response.redirect(`/blog/${id}`)
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

    return `
      L'article ${post.id},
      \n
      "${post.title}",
      \n
      a ete supprime.
    `
  }
}
