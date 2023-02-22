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
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [rules.confirmed('passwordConfirm'), rules.validate()]),
  })

  public messages: CustomMessages = {
    'required': 'Le champs doit etre complete',
    'email': `l'email doit etre au format email : bernard@email.com,  jeannette.dupond@laposte.fr`,
    'email.unique': `L'adresse email est deja utilise`,
    'passwordConfirm.confirmed': 'Les mots de passe doivent se correspondre',
    'password.validate': `Le mot de passe n'est pas assez fort :
    • il doit etre d'une longueur minimum de 8 caracteres
    • il doit contenir au minimum 2 chiffres, 2 minuscules et 2 majuscules`,
  }
}
