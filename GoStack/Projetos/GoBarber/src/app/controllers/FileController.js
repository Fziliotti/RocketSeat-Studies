const path = require('path')
class FileController {
  show (req, res) {
    const { file } = req.params
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file
    )
    return res.sendFile(filePath) // manda o arquivo que esta no servidor para quem chamou o endpoint
  }
}

module.exports = new FileController()
