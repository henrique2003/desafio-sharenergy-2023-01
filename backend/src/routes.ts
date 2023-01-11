import { Router } from 'express'

const routes = Router()

// User
routes.post('/user/login', (req, res) => {
  res.send('Hellow world')
})
routes.get('/user', (req, res) => {
  res.send('Hellow world')
})

export default routes
