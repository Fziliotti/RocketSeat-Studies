const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes');
const server = express();
const cors = require('cors');
const porta = 3333;

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack2019-v0p1k.mongodb.net/omnistack8?retryWrites=true&w=majority', {
      useNewUrlParser: true
})

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(porta, (req, res) => {
      console.log(`
App GitTinder rodando na porta:
http://localhost:${porta}  =)
`)
})


// class App {
//   constructor () {
//     this.express = express()
//     this.database()
//     this.routes()
//     this.middlewares()
//   }

//   database () {
//     mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack2019-v0p1k.mongodb.net/omnistack8?retryWrites=true&w=majority', {
//       useNewUrlParser:true
//     })
//   }

//   middlewares () {
//     server.use(cors());
//     server.use(express.json())
//     server.use(routes);
//   }

//   routes () {
//     this.express.use(require('./routes'))
//   }

// }

// module.exports = new App().express
