const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided!' })
  }

  // authorization: Bearer TOKEN

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)
    req.userId = decoded.id // toda requisicao que tem esse middeware irá proparar essa variavel userId
    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token!' })
  }
}
