import { Router } from 'express'
import UserController from './controller/UserController'

const routes = Router()

const user = new UserController()

// User
routes.post('/user/login', user.login)
routes.get('/user', (req, res) => {
  res.send('Hellow world')
})

export default routes
