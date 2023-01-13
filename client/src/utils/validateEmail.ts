import validator from 'validator'

export default function validateEmail(email: string): boolean {
  if (!email || !email.trim() || !validator.isEmail(email)) {
    return false
  }

  return true
}
