import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { PasswordValidator, UserValidator } from 'App/Validators/UserValidator'

export const allowUsrCreate = Boolean(Number(process.env.USER_CREATE))

export default class UsersController {
  async create({ request, response, session, auth }: HttpContextContract) {
    if (allowUsrCreate === true) {
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

  async password({ request, params, auth, response, session }: HttpContextContract) {
    const query = params.query

    const user = await User.findOrFail(auth.user.id)

    if (query === 'change') {
      const { password, newPasswd } = request.body()

      if (typeof password === 'string' && (await Hash.verify(user.password, password))) {
        if (password !== newPasswd) {
          const data = await request.validate(PasswordValidator)

          await user
            .merge({
              password: data.newPasswd,
            })
            .save()

          session.flash({ success: `Le mot de passe a ete change` })
        } else {
          session.flash({ errors: { newPasswd: 'les mots de passe doivent etre differents' } })
        }
      } else {
        session.flash({ errors: { password: 'erreur de mot de passe' } })
      }
    } else if (query === 'recover') {
      const { newPasswd } = request.body()

      const passCompare = await Hash.verify(user.password, newPasswd)

      if (passCompare === false) {
        const data = await request.validate(PasswordValidator)

        await user
          .merge({
            password: data.newPasswd,
          })
          .save()

        session.flash({ success: `Le mot de passe a ete change` })
      } else {
        session.flash({
          errors: { newPasswd: `le nouveau mots de passe doit differer de l'ancien` },
        })
      }
    }
    return response.redirect().back()
  }
}
