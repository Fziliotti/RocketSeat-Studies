const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

  async index(req, res) {
    const { user } = req.headers;
    try{
      const loggedDev = await Dev.findById(user);
      // Fazendo a busca de usuarios que ne(notequal) e nin(not in) array de likes e deslikes do usuario logado (no header)
      const users = await Dev.find({
        $and: [
          { _id: { $ne: user} },
          { _id: { $nin: loggedDev.likes } },
          { _id: { $nin: loggedDev.dislikes } },
        ]
      })
  
      return res.json(users)

    }catch(err) {
      return res.json({ error: err, msg: "Esse erro foi pêgo pelo catch"})
    } 
  },

  async store(req, res) {
      const { username } = req.body;
      try{
      const userExists = await Dev.findOne({ user:username });

      if(userExists) return res.json(userExists)

      const response = await axios.get(`http://api.github.com/users/${username}`);
  
      const { name, bio, avatar_url: avatar } = response.data
  
      const dev = await Dev.create({
        name, user: username, bio, avatar
      })

      return res.json(dev)
      
      }catch(err) {
        return res.json({ error: err, msg: "Esse erro foi pêgo pelo catch"})
      } 
  },
}


// Geralmente nos controllers sempre e na maioria das vezes somente existirão 5 métodos: INDEX SHOW STORE UPDATE DELE