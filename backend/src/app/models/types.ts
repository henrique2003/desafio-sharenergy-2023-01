import { Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
}

export interface IClient extends Document {
  name: string
  email: string
  phone: number
  address: string
  cpf: number
}
