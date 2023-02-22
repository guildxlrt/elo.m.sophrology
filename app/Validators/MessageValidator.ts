import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const namesRegex = new RegExp(
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
)

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    surname: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(60),
      rules.regex(new RegExp(namesRegex)),
    ]),
    name: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(140),
      rules.regex(new RegExp(namesRegex)),
    ]),
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
    regex: `Le champs ne doit comporter que des lettres`,
    required: 'Le champs doit etre complete',
    email: `Ladresse'email doit etre au format email : bernard@email.com,  jeannette.dupond@laposte.fr`,
  }
}
