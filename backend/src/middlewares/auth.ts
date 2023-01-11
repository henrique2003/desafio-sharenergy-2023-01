import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export function auth(req: Request, res: Response, next: NextFunction): Response {
  const authToken = req.header('authorization')

  if (!authToken) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  try {
    const [, token] = authToken.split(' ')

    const { id } = verify(token, process.env.JWT_SECRET_ID) as { id: number }

    req.userId = id

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}