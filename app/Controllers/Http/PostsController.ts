import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Post from 'App/Models/Post'
import { string } from '@ioc:Adonis/Core/Helpers'
import { PostType } from 'App/Utils/Types'
import {
  ArticleValidator,
  NewVideoValidator,
  UpdateVideoValidator,
} from '../../Validators/PostValidator'
import { NewArticle, NewVideo, UpdateArticle, UpdateVideo } from '../../Utils/Types'

export default class PostsController {
  async new({ request, auth, response }: HttpContextContract) {
    const contentType: PostType = request.body().content_type

    if (contentType === PostType.ARTICLE) {
      const data = await request.validate(ArticleValidator)

      const cover = data.cover
      let newFileName: string | null = null

      if (cover !== null || undefined) {
        newFileName = string.generateRandom(32) + '.' + cover?.extname
        await cover?.moveToDisk('covers', { name: newFileName })
      }

      const cleanedData: NewArticle = {
        status: true,
        user_id: auth.user.id,
        title: data.title,
        content_type: data.content_type,
        content: data.content,
        cover: newFileName,
      }

      const post = await Post.create({
        ...cleanedData,
      })

      const id = post.$attributes.id

      return response.status(200).json({
        id: id,
        created: true,
        msg: `L'article a ete sauvegarde et publie`,
      })
    } else if (contentType === PostType.VIDEO) {
      const data = await request.validate(NewVideoValidator)

      const video = data.video

      const newFileName = string.generateRandom(32) + '.' + video?.extname
      await video?.moveToDisk('videos', { name: newFileName })

      const cleanedData: NewVideo = {
        status: true,
        user_id: auth.user.id,
        title: data.title,
        content_type: data.content_type,
        content: newFileName,
      }

      const post = await Post.create({
        ...cleanedData,
      })

      const id = post.$attributes.id

      return {
        id: id,
        created: true,
        msg: `La video a ete sauvegarde et publie`,
      }
    }
  }

  async update({ params, request, bouncer, response }: HttpContextContract) {
    const id = params.id
    const post = await Post.findOrFail(id)

    // AUTHORIZE
    if ((await bouncer.allows('editPost', post)) === true) {
      const contentType = request.body().content_type

      //Content type consistency
      if (contentType !== post.content_type) {
        return response.status(409).json({
          content_type_error:
            "the Post's content type is not the same in the Database and the request",
        })
        //ARTICLE MODIF
      } else if (contentType === PostType.ARTICLE) {
        const data = await request.validate(ArticleValidator)

        if (
          (data.title === post.title || params.title === '') &&
          (data.content === post.content || params.content === '') &&
          !data.cover
        ) {
          return response.status(202).json({
            id: id,
            new: false,
            msg: `Aucune modifications !!`,
          })
        } else {
          const newData: UpdateArticle = {
            title: post.title,
            content: post.content,
            cover: post.cover,
          }

          if (data.title) {
            newData.title = request.body().title
          }

          if (data.content) {
            newData.content = request.body().content
          }

          if (data.cover) {
            const cover = data.cover

            const newFileName = string.generateRandom(32) + '.' + cover?.extname
            await cover?.moveToDisk('covers', { name: newFileName })

            newData.cover = newFileName
            await Drive.delete(`covers/${post.cover}`)
          }

          await post
            .merge({
              ...newData,
            })
            .save()

          return response.status(200).json({
            id: id,
            new: false,
            msg: `L'article a ete mit a jour`,
          })
        }
        //VIDEO MODIF
      } else if (contentType === PostType.VIDEO) {
        const data = await request.validate(UpdateVideoValidator)

        if ((data.title === post.title || params.title === '') && !data.video) {
          return response.status(202).json({
            id: id,
            new: false,
            msg: `Aucune modifications !!`,
          })
        } else {
          const newData: UpdateVideo = {
            title: post.title,
            content: post.content,
          }

          if (data.title) {
            newData.title = request.body().title
          }

          if (data.video) {
            const video = data.video

            const newFileName = string.generateRandom(32) + '.' + video?.extname
            await video?.moveToDisk('videos', { name: newFileName })

            newData.content = newFileName
            await Drive.delete(`videos/${post.content}`)
          }

          await post
            .merge({
              ...newData,
            })
            .save()

          return response.status(200).json({
            id: id,
            new: false,
            msg: `La video a ete mit a jour`,
          })
        }
      }
    } else {
      return response.status(401).json({
        id: id,
        new: false,
        msg: `Cet article n'est pas le votre`,
      })
    }
  }

  async status({ params, response, bouncer }: HttpContextContract) {
    const id = params.id

    const post = await Post.findOrFail(id)

    if ((await bouncer.allows('editPost', post)) === true) {
      await post
        .merge({
          status: !post.status,
        })
        .save()

      return response.status(200).json(post.status)
    } else return response.status(401).json('Acces non authorise')
  }

  async beforeDelete({ params, bouncer, response }: HttpContextContract) {
    const id = params.id
    const post = await Post.findOrFail(id)

    if ((await bouncer.allows('editPost', post)) === true) {
      return response.status(202)
    } else return response.status(401).json('Acces non authorise')
  }

  async delete({ params, response, bouncer }: HttpContextContract) {
    const id = params.id

    const post = await Post.findOrFail(id)

    if ((await bouncer.allows('editPost', post)) === true) {
      const contentType = post.content_type
      const video = post.content
      const cover = post.cover

      if (contentType === PostType.VIDEO) {
        await Drive.delete(`videos/${video}`)
      } else if (contentType === PostType.ARTICLE && cover !== null) {
        await Drive.delete(`covers/${cover}`)
      }

      await post.delete()

      return response.status(200).json('La publication a ete supprime.')
    } else return response.status(401).json('Acces non authorise')
  }
}
