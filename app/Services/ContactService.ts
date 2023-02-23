import Mail from '@ioc:Adonis/Addons/Mail'

export class ContactService {
  async send(params: Record<string, any>) {
    await Mail.send((message) => {
      message
        .from(params.email)
        .to('guillaume.lauret@protonmail.com')
        .subject('Demande de contact')
        .htmlView('email/email', params)
    })
  }
}
