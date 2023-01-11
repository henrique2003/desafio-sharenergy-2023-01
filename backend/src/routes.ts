import { Router } from 'express'
import UserController from './controller/UserController'
import { auth } from './middlewares/auth'

const routes = Router()

const user = new UserController()

// User
routes.post('/user/login', user.login)
routes.get('/user', auth, user.loadUser)

export default routes
