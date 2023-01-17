import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import User from '../models/User'
import { badRequest, ok, serverError, unauthorized } from '../helpers/response-status'
import { generateToken, validateEmptyField } from '../utils'
import { invalidFieldMsg } from '../helpers/response-message'

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, rememberLogin } = req.body

      if (!validateEmptyField(username)) {
        return badRequest(res, invalidFieldMsg('username'))
      }

      if (!validateEmptyField(password)) {
        return badRequest(res, 'Senha em branco')
      }

      const user = await User.findOne({ username }).select('+password')

      if (!user) {
        return badRequest(res, 'Usuário não encontrado')
      }

      if (!await bcrypt.compare(password, user.password)) {
        return badRequest(res, invalidFieldMsg('password'))
      }
      user.password = undefined

      const token = generateToken(user.id, rememberLogin)

      return ok(res, { user, token })
    } catch (error) {
      return serverError(res)
    }
  }

  public async loadUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req

      if (!userId) {
        return unauthorized(res)
      }

      const user = await User.findById(userId)

      if (!user) {
        return badRequest(res, 'Usuário não encontrado')
      }

      return ok(res, { user })
    } catch (error) {
      return serverError(res)
    }
  }
}

export default UserController
