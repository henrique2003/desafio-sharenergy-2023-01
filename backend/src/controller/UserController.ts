import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import User from '../models/User'
import { badRequest } from '../helpers/response-status'
import { generateToken, validateEmptyField } from '../utils'

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

  public async loadUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req

      if (!userId) {
        return res.status(401).json({ error: 'Invalid token' })
      }

      const user = await User.findById(userId)

      if (!user) {
        return res.status(401).json({ error: 'Invalid token' })
      }

      return res.status(200).json({ user })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default UserController
