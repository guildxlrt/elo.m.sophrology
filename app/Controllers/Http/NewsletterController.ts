import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject } from '@adonisjs/core/build/standalone'
import SubscribeValidator from '../../Validators/SubscribeValidator'
import { NewsletterService } from '../../Services/NewsletterService'

interface SubscribeData {
  email: string
  conditions: boolean
}

@inject()
export default class NewsletterController {
  constructor(private list: NewsletterService) {}

  async subscribe({ request, response }: HttpContextContract) {
    const data = await request.validate(SubscribeValidator)

    let mailchimpRes: any

    await this.list.add(data as SubscribeData).then((res: any) => {
      mailchimpRes = res
    })

    if (mailchimpRes === 'service_error') {
      return response.status(503).json({
        errors: [
          {
            field: 'send',
            message: "Erreur serveur : votre requete n'a pas pu aboutir",
          },
        ],
      })
    } else {
      return response.status(200).json(mailchimpRes)
    }
  }

  async unsubscribe({ request, response }: HttpContextContract) {
    const data = await request.validate(SubscribeValidator)

    let mailchimpRes: any

    await this.list.unsub(data as SubscribeData).then((res: any) => {
      mailchimpRes = res
    })

    if (mailchimpRes === 'service_error') {
      return response.status(503).json({
        errors: [
          {
            field: 'send',
            message: "Erreur serveur : votre requete n'a pas pu aboutir",
          },
        ],
      })
    } else {
      return response.status(200).json(mailchimpRes)
    }
  }

  async resubscribe({ request, response }: HttpContextContract) {
    const data = await request.validate(SubscribeValidator)

    let mailchimpRes: any

    await this.list.resub(data as SubscribeData).then((res: any) => {
      mailchimpRes = res
    })

    if (mailchimpRes === 'service_error') {
      return response.status(503).json({
        errors: [
          {
            field: 'send',
            message: "Erreur serveur : votre requete n'a pas pu aboutir",
          },
        ],
      })
    } else {
      return response.status(200).json(mailchimpRes)
    }
  }
}
