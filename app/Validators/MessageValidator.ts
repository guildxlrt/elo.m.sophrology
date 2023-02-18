import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    surname: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(24)]),
    name: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(24)]),
    email: schema.string([
      rules.email(),
      rules.normalizeEmail({
        allLowercase: true,
        gmailRemoveDots: true,
        gmailRemoveSubaddress: true,
      }),
    ]),
    content: schema.string({ trim: true }, [rules.maxLength(5000)]),
    conditions: schema.boolean(),
  })

  public messages: CustomMessages = {
    minLength: 'Le champs doit comporter au minimum {{ options.minLength }} caracteres',
    maxLength: 'Le champs ne doit pas depasser les {{ options.maxLength }} caracteres',
    required: 'Le champs doit etre complete.',
    email: `l'email doit etre au format email : bernard@email.com,  jeannette.dupond@laposte.fr`,
  }
}
