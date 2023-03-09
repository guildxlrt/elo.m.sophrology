import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubscribeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.email(),
      rules.normalizeEmail({
        allLowercase: true,
        gmailRemoveDots: true,
        gmailRemoveSubaddress: true,
      }),
    ]),
    conditions: schema.boolean([rules.checkIsTrue()]),
  })

  public messages: CustomMessages = {
    'required': 'Le champs doit etre complete',
    'email': `L'adresse email doit etre au format email : bernard@email.com,  jeannette.dupond@laposte.fr`,
    'conditions.required': 'Les conditions doivent etre acceptees',
    'conditions.checkIsTrue': 'Les conditions doivent etre acceptees',
  }
}
