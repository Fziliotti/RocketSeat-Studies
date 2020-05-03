
const Dev = require('../models/Dev')

module.exports = {
  // Salvando a informação do Like no banco de dados
  async store(req,res) {
    const { devId } = req.params;
    const { user } = req.headers;

    try {
      const loggedDev = await Dev.findById(user)
      const targetDev = await Dev.findById(devId)

      if(!targetDev) return res.status(400).json({ error: 'Dev not exists' })
      
      if(targetDev.likes.includes(targetDev._id)){
        console.log('Deu Match')
        return res.status(200).json({ warning: 'Double like is not available' })
      }

      loggedDev.likes.push(targetDev._id)
      await loggedDev.save()
      return res.json(loggedDev)

    }catch(err) {
      return res.json({ error: err, msg: "Esse erro foi pegô pelo catch"})
    }
  }
}


// Geralmente nos controllers sempre e na maioria das vezes somente existirão 5 métodos: INDEX SHOW STORE UPDATE DELE