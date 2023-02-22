import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  async create({ request, response, session }: HttpContextContract) {
    const data = await request.validate(UserValidator)

    const user = await User.create({
      ...data,
    })
    user.save()

    const id = user.$attributes.id
    session.flash({ success: `L'utilisateur ${id} a ete cree !!` })
    return response.redirect().back()
  }

  async login({ request, auth, response, session }: HttpContextContract) {
    const { email, password } = request.body()

    try {
      await auth.use('web').attempt(email, password)
      session.flash({ success: 'Vous etes connecte' })
    } catch {
      session.flash({ alert: 'identifiants incorrects' })
    }
    return response.redirect().back()
  }

  async logout({ auth }: HttpContextContract) {
    await auth.use('web').logout()
  }
}
