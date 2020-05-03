// em desenvolvimento posso usar i https://mailtrap.io/
// em produção eu usaria um serviço como amazonSASS, sendgrid, netMandril, sparkPost
module.exports = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
}
