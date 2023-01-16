import { Router } from 'express'

import ClientController from './controller/ClientController'
import UserController from './controller/UserController'
import { auth } from './middlewares/auth'

const routes = Router()

const user = new UserController()
const client = new ClientController()

// User
routes.post('/user/login', user.login)
routes.get('/user', auth, user.loadUser)

// Client
routes.get('/client', auth, client.getAll)
routes.post('/client/create', auth, client.create)
routes.put('/client/edit/:id', auth, client.update)
routes.delete('/client/:id', auth, client.delete)

export default routes
