const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }
  async store (req, res) {
    const { filename: avatar } = req.file
    try {
      await User.create({ ...req.body, avatar })
    } catch (err) {
      console.log(err)
    }

    return res.redirect('/')
  }
}

module.exports = new UserController()
