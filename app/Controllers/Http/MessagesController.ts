import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MessageValidator from 'App/Validators/MessageValidator'
import { ContactService } from 'App/Services/ContactService'
import { inject } from '@adonisjs/core/build/standalone'

export interface MessageData {
  surname: string
  name: string
  email: string
  content: string
  conditions: boolean
}

@inject()
export default class MessagesController {
  constructor(private contact: ContactService) {}

  async send({ request }: HttpContextContract) {
    const x = request.body()
    console.log(x.conditions)

    const data = await request.validate(MessageValidator)
    this.contact.send(data as MessageData)

    return `Le messasge a ete envoye.`
  }
}
