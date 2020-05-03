const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

// Não tem tabela, nao vai ter migrations, cada dado dentro do mongodb pode ter formatos diferentes
// é salvo de maneira não estruturado
// os dados que sao salvos no mongo são dados nativos do javascript
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// antes de alguma coisa disparo o pre
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.methods = {
  // verifica se a senha passada no parametro é a mesma que está salva no banco
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}

// nao precisa da instancia do Schema
UserSchema.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl // 1 dia
    })
  }
}

module.exports = mongoose.model('User', UserSchema)
