// como esse serviço de email nao faria sentido ter um controller
const nodemailer = require('nodemailer')
const mailConfig = require('../../config/mail')
const path = require('path')

// criar o template do email para deixar mais bonito
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')

const transport = nodemailer.createTransport(mailConfig)

const viewPath = path.resolve(__dirname, '..', 'views', 'emails')
// definicao de uma middleware
transport.use(
  'compile',
  hbs({
    viewEngine: exphbs.create({
      partialsDir: path.resolve(viewPath, 'partials') // codigos que vao repetir do template de email
    }),
    viewPath,
    extName: '.hbs'
    // extensao dos templates
  })
)
module.exports = transport
