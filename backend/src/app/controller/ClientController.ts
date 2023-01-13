import { Request, Response } from 'express'

import Client from '../models/Client'
import { badRequest, ok, serverError } from '../helpers/response-status'
import { invalidFieldMsg } from '../helpers/response-message'
import { isEqualLength, validateCpf, validateEmptyField } from '../utils'
import validateEmail from '../utils/validateEmail'

class ClientController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const clients = await Client.find()

      return ok(res, { clients })
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

      if (!validateEmail(email)) {
        return badRequest(res, invalidFieldMsg('email'))
      }

      if (!validateEmptyField(address)) {
        return badRequest(res, invalidFieldMsg('endereço'))
      }

      if (!isEqualLength(phone, 10)) {
        return badRequest(res, invalidFieldMsg('telefone'))
      }

      if (!validateCpf(cpf)) {
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
        return badRequest(res, 'Cliente não encotrado')
      }

      const client = await Client.findById(id)

      if (validateEmptyField(name)) client.name = name
      if (validateEmail(email)) client.email = email
      if (validateEmptyField(address)) client.address = address
      if (isEqualLength(phone, 10)) client.phone = phone
      if (validateCpf(cpf)) client.cpf = cpf

      await client.save()
      const newClient = await Client.findById(id)

      return ok(res, { client: newClient })
    } catch (error) {
      return serverError(res)
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      if (!id) {
        return badRequest(res, 'Necessário id do client')
      }

      if (!await Client.findById(id)) {
        return badRequest(res, 'Cliente não encotrado')
      }

      await Client.findByIdAndDelete(id)

      return res.status(204).json()
    } catch (error) {
      return serverError(res)
    }
  }
}

export default ClientController
