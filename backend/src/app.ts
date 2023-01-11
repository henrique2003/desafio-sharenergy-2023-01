import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import connectDb from './config/db'

class App {
  public readonly express: express.Application

  constructor() {
    this.express = express()
    this.middlewares()
  }

  middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(helmet())
    void this.configDb()
  }

  async configDb(): Promise<void> {
    await connectDb()
  }
}

export default new App().express
