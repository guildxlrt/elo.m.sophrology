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
import { DateTime } from 'luxon'
import { new_url_path } from '../../Utils/Functions'

export default class PostsController {
  async new({ request, auth, response }: HttpContextContract) {
    const contentType: PostType = request.body().content_type

    if (contentType === PostType.ARTICLE) {
      const data = await request.validate(ArticleValidator)

      const urlPath: any = await new_url_path(request.body().title)

      if (urlPath.error) {
        return response.status(400).json({ errors: urlPath.error })
      }

      const cover = data.cover
      const covercheck = data.covercheck
      let newFileName: string | null = null

      if (covercheck === true && cover === undefined) {
        return response.status(400).json({
          errors: [
            {
              field: 'cover',
              message: `cover's check is on, but there is no file`,
            },
          ],
        })
      } else if (covercheck === false && cover !== undefined) {
        return response.status(400).json({
          errors: [
            {
              field: 'cover',
              message: `cover's check is off, but there is a file`,
            },
          ],
        })
      } else if (covercheck === true && cover !== undefined) {
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
        url_path: urlPath,
        updatedAt: null,
      }

      const post = await Post.create({
        ...cleanedData,
      })

      const { id, url_path } = post.$attributes

      return response.status(200).json({
        id: id,
        url_path: url_path,
        created: true,
        msg: `L'article a ete sauvegarde et publie`,
      })
    } else if (contentType === PostType.VIDEO) {
      const data = await request.validate(NewVideoValidator)

      const urlPath: any = await new_url_path(request.body().title)

      if (urlPath.error) {
        return response.status(400).json({ errors: urlPath.error })
      }

      const video = data.video

      const newFileName = string.generateRandom(32) + '.' + video?.extname
      await video?.moveToDisk('videos', { name: newFileName })

      const cleanedData: NewVideo = {
        status: true,
        user_id: auth.user.id,
        title: data.title,
        content_type: data.content_type,
        content: newFileName,
        url_path: urlPath,
        updatedAt: null,
      }

      const post = await Post.create({
        ...cleanedData,
      })

      const { id, url_path } = post.$attributes

      return {
        id: id,
        url_path: url_path,
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

        // verifying the conformity of request (cover)
        if (data.covercheck === false && data.cover !== undefined) {
          return response.status(400).json({
            errors: [
              {
                field: 'cover',
                message: `cover's check is off, but there is a file`,
              },
            ],
          })
        } else {
          // Cover state changes :
          // null = no changes, true = changing, false = delete
          let coverState: boolean | null = null

          if (data.covercheck === false && post.cover !== null) {
            coverState = false
          } else if (data.covercheck === false && post.cover === null) {
            coverState = null
          } else if (data.covercheck === true && data.cover !== undefined) {
            coverState = true
          } else if (data.covercheck === true && data.cover === undefined) {
            coverState = null
          }

          if (
            (data.title === post.title || params.title === '') &&
            (data.content === post.content || params.content === '') &&
            coverState === null
          ) {
            return response.status(202).json({
              id: id,
              url_path: post.url_path,
              new: false,
              msg: `Aucune modifications !!`,
            })
          } else {
            const cleanedData: UpdateArticle = {
              title: post.title,
              content: post.content,
              cover: post.cover,
              url_path: post.url_path,
              updatedAt: DateTime.local(),
            }

            if (data.title !== post.title && params.title !== '') {
              cleanedData.title = request.body().title

              const urlPath: any = await new_url_path(request.body().title)

              if (urlPath.error && data.title !== post.title) {
                return response.status(400).json({ errors: urlPath.error })
              }

              cleanedData.url_path = urlPath
            }

            if (data.content) {
              cleanedData.content = request.body().content
            }

            // changer de cover
            if (coverState === true) {
              const cover = data.cover

              const newFileName = string.generateRandom(32) + '.' + cover?.extname
              await cover?.moveToDisk('covers', { name: newFileName })

              cleanedData.cover = newFileName
              await Drive.delete(`covers/${post.cover}`)
              // enlever la cover
            } else if (coverState === false) {
              cleanedData.cover = null
              await Drive.delete(`covers/${post.cover}`)
            }

            await post
              .merge({
                ...cleanedData,
              })
              .save()

            const { url_path } = post.$attributes

            console.log(url_path)

            return response.status(200).json({
              id: id,
              url_path: url_path,
              new: false,
              msg: `L'article a ete mit a jour`,
            })
          }
        }
        //VIDEO MODIF
      } else if (contentType === PostType.VIDEO) {
        const data = await request.validate(UpdateVideoValidator)

        if ((data.title === post.title || params.title === '') && !data.video) {
          return response.status(202).json({
            id: id,
            url_path: post.url_path,
            new: false,
            msg: `Aucune modifications !!`,
          })
        } else {
          const cleanedData: UpdateVideo = {
            title: post.title,
            content: post.content,
            url_path: post.url_path,
            updatedAt: DateTime.local(),
          }

          if (data.title !== post.title && params.title !== '') {
            cleanedData.title = request.body().title

            const urlPath: any = await new_url_path(request.body().title)

            if (urlPath.error && data.title !== post.title) {
              return response.status(400).json({ errors: urlPath.error })
            }

            cleanedData.url_path = urlPath
          }

          if (data.video) {
            const video = data.video

            const newFileName = string.generateRandom(32) + '.' + video?.extname
            await video?.moveToDisk('videos', { name: newFileName })

            cleanedData.content = newFileName
            await Drive.delete(`videos/${post.content}`)
          }

          await post
            .merge({
              ...cleanedData,
            })
            .save()

          const { url_path } = post.$attributes

          return response.status(200).json({
            id: id,
            url_path: url_path,
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
