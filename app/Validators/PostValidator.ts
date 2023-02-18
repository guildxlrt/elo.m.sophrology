import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(140)]),
    content: schema.string.nullableAndOptional({ trim: true }, [rules.maxLength(30000)]),
  })

  public messages: CustomMessages = {
    required: 'Le champs doit etre complete.',
    minLength: 'Le champs doit comporter au minimum {{ options.minLength }} caracteres',
    maxLength: 'Le champs ne doit pas depasser les {{ options.maxLength }} caracteres',
  }
}
