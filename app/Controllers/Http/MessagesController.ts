import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import MessageValidator from '../../Validators/MessageValidator'

export default class MessagesController {
  async send({ request, session }: HttpContextContract) {
    const data = await request.validate(MessageValidator)

    if (data.conditions === true) {
      await Database.table('messages').returning('id').insert({
        surname: data.surname,
        name: data.name,
        email: data.email,
        content: data.content,
      })
      return `Le messasge a ete envoye.`
    } else {
      return { check: false }
    }
  }
}
