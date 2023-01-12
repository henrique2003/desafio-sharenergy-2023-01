import { Schema, model } from 'mongoose'

import { IClient } from './types'

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: Number,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  cpf: {
    type: Number,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

export default model<IClient>('Client', ClientSchema)
