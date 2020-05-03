const User = require('../models/User')

class UserController {
  async store (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }

  async index (req, res) {
    const users = await User.find()
    if (!users) {
      return res.status(400).json({ error: 'Users not found' })
    }

    return res.json(users)
  }
}

module.exports = new UserController()
