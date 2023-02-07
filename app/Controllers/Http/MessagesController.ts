import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MessagesController {
  async send({ request }: HttpContextContract) {
    const { surname, name, email, content, conditions } = request.body()

    if (conditions === true) {
      await Database.table('messages').returning('id').insert({
        surname: surname,
        name: name,
        email: email,
        content: content,
      })
      return { success: true }
    } else {
      return { uncheckError: true }
    }
  }
}
