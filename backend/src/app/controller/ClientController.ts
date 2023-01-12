import { Request, Response } from 'express'
import validator from 'validator'

import Client from '../models/Client'
import { badRequest, ok, serverError } from '../helpers/response-status'
import { invalidFieldMsg } from '../helpers/response-message'
import { validateCpf, validateEmptyField } from '../utils'

class ClientController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const client = await Client.find()

      return ok(res, { client })
    } catch (error) {
      return serverError(res)
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone, address, cpf } = req.body

      if (!validateEmptyField(name)) {
        return badRequest(res, invalidFieldMsg('nome'))
      }

      if (!validateEmptyField(email) || !validator.isEmail(email)) {
        return badRequest(res, invalidFieldMsg('email'))
      }

      if (!validateEmptyField(address)) {
        return badRequest(res, invalidFieldMsg('endereço'))
      }

      if (phone.toString().length !== 8) {
        return badRequest(res, invalidFieldMsg('telefone'))
      }

      if (cpf.toString().length !== 11 || !validateCpf(cpf.toString())) {
        return badRequest(res, invalidFieldMsg('cpf'))
      }

      const client = await Client.create({
        name,
        email,
        phone,
        address,
        cpf
      })

      return ok(res, { client })
    } catch (error) {
      return serverError(res)
    }
  }
}

export default ClientController
