import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import User from '../models/User'
import generateToken from '../utils/generateToken'

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, rememberLogin } = req.body

      if (!password.trim()) {
        return res.status(400).json('Nome de usuário inválido')
      }

      if (!username.trim()) {
        return res.status(400).json('Senha em branco')
      }

      const user = await User.findOne({ username }).select('+password')

      if (!user) {
        return res.status(400).json('Usuário não encontrado')
      }

      if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json('Senha inválida')
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
