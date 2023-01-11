import { Response } from 'express'

export function badRequest(res: Response, message: string): Response {
  return res.status(400).json({ message })
}

export function ok(res: Response, data: any): Response {
  return res.status(200).json(data)
}
