require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const validate = require('express-validation')
const databaseConfig = require('./config/database')
const sentryConfig = require('./config/sentry')
const Youch = require('youch')
const Sentry = require('@sentry/node')

// sintaxe de classe para organizar melhor

class App {
  constructor () {
    this.express = express()
    // essa variavel abaixo usa 3 principais valores, testing, development, production
    this.isDev = process.env.NODE_ENV !== 'production'
    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }
  sentry () {
    Sentry.init(sentryConfig)
  }

  database () {
    // mongodb://usuario:senha@localhost:27017/nomedatabase SE FOSSE MONGODB ATLAS
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  middlewares () {
    this.express.use(Sentry.Handlers.requestHandler())
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }

  // Como o middleware tem 4 parametros, logo ele sera um middleware de tratamento de erros
  exception () {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler())
    }

    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err, req)
        return res.json(await youch.toJSON())
      }
      return res
        .status(err.status || 500)
        .json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
