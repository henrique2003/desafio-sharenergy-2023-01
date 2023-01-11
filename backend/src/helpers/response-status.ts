import { Response } from 'express'

export function badRequest(res: Response, message: string): Response {
  return res.status(400).json({ message })
}
