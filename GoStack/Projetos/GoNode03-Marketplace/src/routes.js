const express = require('express')
const routes = express.Router()
const authMiddleware = require('./app/middlewares/auth')
const controllers = require('./app/controllers')
const handle = require('express-async-handler')

const validate = require('express-validation')
const validators = require('./app/validators')

routes.get('/users', handle(controllers.UserController.index))
routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
) // store serve para criar um novo usuario no mongo

routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)
// Toda rota pra baixo dessa linha 10 vai usar o middleware
routes.use(authMiddleware)

/**
 * Ad
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchases
 */
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)
module.exports = routes
