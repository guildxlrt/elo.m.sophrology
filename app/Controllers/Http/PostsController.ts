import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from '../../Models/Post'
import PostValidator from '../../Validators/PostValidator'

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

  async new({ request, response, session }: HttpContextContract) {
    const data = await request.validate(PostValidator)

    const post = await Post.create({
      ...data,
      status: true,
    })
    post.save()

    const id = post.$attributes.id
    session.flash({ success: `L'article a ete sauvegarde et publie` })
    return response.redirect(`/blog/${id}`)
  }

  async update({ params, request, response, session }: HttpContextContract) {
    const id = params.id
    const { title, content } = request.body()

    const post = await Post.findOrFail(id)
    post
      .merge({
        title: title,
        content: content,
      })
      .save()

    session.flash({ success: `L'article a ete mit a jour` })
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

    return `L'article a ete supprime.`
  }
}
