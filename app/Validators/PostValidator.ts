import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PostType } from 'App/Models/Post'

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(140)]),
    content: schema.string.nullableAndOptional({ trim: true }, [
      rules.minLength(5),
      rules.maxLength(30000),
    ]),
    content_type: schema.enum(Object.values(PostType)),
  })

  public messages: CustomMessages = {
    required: 'Le champs doit etre complete',
    minLength: 'Le champs doit comporter au minimum {{ options.minLength }} caracteres',
    maxLength: 'Le champs ne doit pas depasser les {{ options.maxLength }} caracteres',
  }
}
