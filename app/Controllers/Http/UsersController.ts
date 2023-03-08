import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { PasswordValidator, UserValidator } from 'App/Validators/UserValidator'

export const allowNewUsr = Boolean(Number(process.env.CREATE_USER))

export default class UsersController {
  async create({ request, response, session, auth }: HttpContextContract) {
    if (allowNewUsr === true) {
      const data = await request.validate(UserValidator)

      const user = await new User()
      await user.merge({
        ...data,
      })
      await user.save()

      const id = user.$attributes.id
      session.flash({ success: `L'utilisateur ${id} a ete cree !!` })

      await auth.use('web').attempt(data.email, data.password)
    } else {
      session.flash({
        alert: `Creation de compte actuellement suspendue !!`,
      })
    }
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

  async passwordChange({ request, bouncer, auth, response, session }: HttpContextContract) {
    const user = await User.findOrFail(auth.user.id)

    const { password, newPasswd, newPasswdConfirm } = request.body()

    if (typeof user.password === 'string' && (await Hash.verify(user.password, password))) {
      const newPass = {
        newPasswd: newPasswd,
        newPasswdConfirm: newPasswdConfirm,
      }
      const data = await request.validate(PasswordValidator)
    } else {
      session.flash({ alert: 'erreur de mot de passe' })
    }

    return response.redirect().back()
  }
}
