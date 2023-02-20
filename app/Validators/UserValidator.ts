import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.normalizeEmail({
        allLowercase: true,
        gmailRemoveDots: true,
        gmailRemoveSubaddress: true,
      }),
    ]),
    password: schema.string({ trim: true }, [
      rules.confirmed('passwordConfirm'),
      rules.minLength(4),
    ]),
  })

  public messages: CustomMessages = {
    'required': 'Le champs doit etre complete.',
    'email': `l'email doit etre au format email : bernard@email.com,  jeannette.dupond@laposte.fr`,
    'passwordConfirm.confirmed': 'Les mots de passe doivent se correspondre',
  }
}
