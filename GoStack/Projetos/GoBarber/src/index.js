const server = require('./server')

server.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`
  Gobarber rodando na porta:
  http://localhost:3000
  Top!
  `)
}) // se o servidor passa a variavel de ambiente ou nao.
