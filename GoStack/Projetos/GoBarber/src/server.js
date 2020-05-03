const express = require('express')
const session = require('express-session')
const LokiStore = require('connect-loki')(session)
const nunjucks = require('nunjucks')
const flash = require('connect-flash')
const path = require('path')
// sintaxe de classe para organizar melhor

class App {
  constructor () {
    this.express = express()
    // essa variavel abaixo usa 3 principais valores, testing, development, production
    this.isDev = process.env.NODE_ENV !== 'production'
    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false })) // lidar com forms
    this.express.use(flash())
    this.express.use(
      session({
        store: new LokiStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        secret: 'secreto', // serve para criptografar a sessao, tem que deixar em otro arq
        resave: false, //
        saveUninitialized: true
      })
    )
  }

  views () {
    // usar o path para compatibilidade de SOS
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })
    // Para entregar arquivos estáticos como imagens, arquivos CSS, e arquivos JavaScript, use a função de middleware express.static integrada no Express.
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
