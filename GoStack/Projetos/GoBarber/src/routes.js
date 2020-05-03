const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')
const ScheduleController = require('./app/controllers/ScheduleController')

// controlar as mensagens de erro e sucesso da aplicacao
routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash('success')
  res.locals.flashError = req.flash('error')
  return next()
})

// pega o arquivo passado no parametro e envia
routes.get('/files/:file', FileController.show)

routes.get('/', guestMiddleware, SessionController.create) // Só renderiza na tela
routes.post('/signin', SessionController.store) // verifica login e senha do formulario

routes.get('/signup', guestMiddleware, UserController.create) // cadastro de funcionario só é perimitido p/ usuario nao logado
routes.post('/signup', upload.single('avatar'), UserController.store) // no cadastro, a imagem enviada pelo form deve ser enviada e com nome modificado

routes.use('/app', authMiddleware) // todas rotas que iniciam com app, aplicam o authMiddleware

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)
routes.get('/app/available/:provider', AvailableController.index)

routes.get('/app/schedule', ScheduleController.index)

module.exports = routes
