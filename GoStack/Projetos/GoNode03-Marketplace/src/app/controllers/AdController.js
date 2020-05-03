const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const filters = {}
    if (req.query.price_min || req.query.price_max) {
      filters.price = {}
      if (req.query.price_min) filters.price.$gte = req.query.price_min
      if (req.query.price_max) filters.price.$lte = req.query.price_max
    }
    if (req.query.title) filters.title = new RegExp(req.query.title, 'i')
    console.log(filters)

    try {
      const ads = await Ad.paginate(filters, {
        page: req.query.page || 1,
        limit: 20,
        populate: ['author'], // esse aqui faz com que o author seja preenchido
        sort: '-createdAt'
      })
      return res.json(ads)
    } catch (err) {
      return res.status(400).json({ error: 'Ads Not Found!' })
    }
  }

  async show (req, res) {
    const { id } = req.params
    if (!id) return res.send({ ok: false })
    try {
      const ad = await Ad.findById(id)
      return res.json(ad)
    } catch (err) {
      return res.status(400).json({ error: 'Ad Not Exists!' })
    }
  }

  async store (req, res) {
    // throw new Error()
    try {
      const ad = await Ad.create({ ...req.body, author: req.userId }) // cria a propagando com as informacoes do corpo da requisicao e o author é o usuario logado
      return res.json(ad)
    } catch (err) {
      return res.status(400).json({ error: 'Could not create ad' })
    }
  }

  async update (req, res) {
    // busca por Id e atualiza passando o segundo parametro
    const { id } = req.params
    try {
      const ad = await Ad.findByIdAndUpdate(id, req.body, {
        new: true
      })

      return res.json(ad)
    } catch (err) {
      return res.status(400).json({ error: 'Could not update ad' })
    }
  }

  async destroy (req, res) {
    const { id } = req.params
    try {
      await Ad.findByIdAndDelete(id)
      return res.send()
    } catch (err) {
      return res.send({ error: 'Could not delete ad' })
    }
  }
}

module.exports = new AdController()
