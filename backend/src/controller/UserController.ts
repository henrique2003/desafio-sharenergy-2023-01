import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import User from '../models/User'
import generateToken from '../utils/generateToken'
import { badRequest } from '../helpers/response-status'
import validateEmptyField from '../utils/validateEmptyField'

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, rememberLogin } = req.body

      if (!validateEmptyField(password)) {
        return badRequest(res, 'Nome de usuário inválido')
      }

      if (!validateEmptyField(username)) {
        return badRequest(res, 'Senha em branco')
      }

      const user = await User.findOne({ username }).select('+password')

      if (!user) {
        return badRequest(res, 'Usuário não encontrado')
      }

      if (!await bcrypt.compare(password, user.password)) {
        return badRequest(res, 'Senha inválida')
      }
      user.password = undefined

      const token = generateToken(user.id, rememberLogin)

      return res.status(200).json({ user, token })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default UserController
