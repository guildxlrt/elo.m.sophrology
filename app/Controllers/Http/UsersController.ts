import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import UserValidator from '../../Validators/UserValidator'

export default class UsersController {
  async create({ request, response, session }: HttpContextContract) {
    const data = await request.validate(UserValidator)
    const emailIsUnique = await User.findBy('email', data.email)

    if (emailIsUnique === null) {
      const user = await User.create({
        ...data,
      })
      user.save()

      const id = user.$attributes.id
      session.flash({ success: `L'utilisateur ${id} a ete cree !!` })
      return response.redirect().back()
    } else {
      session.flash({ alert: `Cet adresse email est deja utilise !!` })
      return response.redirect().back()
    }
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
  async logout({ request }: HttpContextContract) {
    return `delete : loged out`
  }
}
