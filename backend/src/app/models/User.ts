import { Schema, model } from 'mongoose'

import { IUser } from './types'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false
  }
}, {
  timestamps: true
})

export default model<IUser>('User', UserSchema)
