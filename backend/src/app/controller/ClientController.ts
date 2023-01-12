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

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { params, body } = req
      const { id } = params
      const { name, email, phone, address, cpf } = body

      if (!await Client.findById(id)) {
        return badRequest(res, 'Cliente não existe')
      }

      const lastClient = await Client.findById(id)

      if (validateEmptyField(name)) lastClient.name = name
      if (validateEmptyField(email) && validator.isEmail(email)) lastClient.email = email
      if (validateEmptyField(address)) lastClient.address = address
      if (phone && phone.toString().length === 8) lastClient.phone = phone
      if (validateCpf(cpf)) lastClient.cpf = cpf

      await lastClient.save()
      const client = await Client.findById(id)

      return ok(res, { client })
    } catch (error) {
      return serverError(res)
    }
  }
}

export default ClientController
