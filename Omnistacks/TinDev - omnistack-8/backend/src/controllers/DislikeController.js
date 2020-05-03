
const Dev = require('../models/Dev')

module.exports = {
  
  async store(req,res) {
    const { devId } = req.params;
    const { user } = req.headers;

    try {
      const loggedDev = await Dev.findById(user)
      const targetDev = await Dev.findById(devId)

      if(!targetDev) return res.status(400).json({ error: 'Dev not exists' })
      
      if(loggedDev.dislikes.includes(targetDev._id)){
        console.log('Deu Dismatch Denovo!')
        return res.status(200).json({ warning: 'Double Match is not available' })
      }

      loggedDev.dislikes.push(targetDev._id)
      await loggedDev.save()
      return res.json(loggedDev)

    }catch(err) {
      return res.json({ error: err, msg: "Esse erro foi pegô pelo catch"})
    }
  }
}


// Geralmente nos controllers sempre e na maioria das vezes somente existirão 5 métodos: INDEX SHOW STORE UPDATE DELE