import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PostType } from '../Utils/Types'

const msg = {
  required: 'Le champs doit etre complete',
  minLength: 'Le champs doit comporter au minimum {{ options.minLength }} caracteres',
  maxLength: 'Le champs ne doit pas depasser les {{ options.maxLength }} caracteres',
  fileSize: 'Le fichier ne doit pas depasser  {{ options.size }}',
  coverExt: "La video doit etre a l'un des formats supportes : .jpg, .gif, .png, .webp",
  videoExt: "La video doit etre a l'un des formats supportes : .mp4, .avi, .mkv, .webm",
}

const limit = {
  cover: '25mb',
  video: '250mb',
}

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content_type: schema.enum(Object.values(PostType)),
    title: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(140)]),
    content: schema.string.nullableAndOptional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(30000),
    ]),
  })

  public messages: CustomMessages = {
    required: msg.required,
    minLength: msg.minLength,
    maxLength: msg.maxLength,
  }
}

export class ArticleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content_type: schema.enum(Object.values(PostType)),
    title: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(140)]),
    content: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(30000)]),
    cover: schema.file.nullableAndOptional({
      size: limit.cover,
      extnames: ['jpg', 'gif', 'png', 'webp', 'JPG', 'GIF', 'PNG', 'WEBP'],
    }),
  })

  public messages: CustomMessages = {
    'required': msg.required,
    'minLength': msg.minLength,
    'maxLength': msg.maxLength,
    'file.size': msg.fileSize,
    'cover.extname': msg.coverExt,
  }
}

export class NewVideoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content_type: schema.enum(Object.values(PostType)),
    title: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(140)]),
    video: schema.file({
      size: limit.video,
      extnames: ['mp4', 'avi', 'mkv', 'webm', 'MP4', 'AVI', 'MKV', 'WEBM'],
    }),
  })

  public messages: CustomMessages = {
    'required': msg.required,
    'minLength': msg.minLength,
    'maxLength': msg.maxLength,
    'file.size': msg.fileSize,
    'video.extname': msg.videoExt,
  }
}

export class UpdateVideoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(140)]),
    video: schema.file.nullableAndOptional({
      size: limit.video,
      extnames: ['mp4', 'avi', 'mkv', 'webm', 'MP4', 'AVI', 'MKV', 'WEBM'],
    }),
  })

  public messages: CustomMessages = {
    'required': msg.required,
    'minLength': msg.minLength,
    'maxLength': msg.maxLength,
    'file.size': msg.fileSize,
    'video.extname': msg.videoExt,
  }
}
