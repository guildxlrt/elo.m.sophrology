import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MessageValidator from 'App/Validators/MessageValidator'
import { ContactService } from 'App/Services/ContactService'
import { inject } from '@adonisjs/core/build/standalone'

interface MessageData {
  surname: string
  name: string
  email: string
  content: string
  conditions: boolean
}

@inject()
export default class MessagesController {
  constructor(private contact: ContactService) {}

  async send({ request, response }: HttpContextContract) {
    const data = await request.validate(MessageValidator)

    let mailerRes: boolean | null = null

    await this.contact.send(data as MessageData).then((res) => {
      if (res === true) mailerRes = true
      if (res === false) mailerRes = false
    })

    if (mailerRes === true) {
      return response.status(200).json('Le message a ete envoye')
    } else if (mailerRes === false) {
      return response.status(503).json({
        errors: [
          {
            field: 'send',
            message: "Erreur interne : le serveur n'a pas pu envoyer le message...",
          },
        ],
      })
    }
  }
}
