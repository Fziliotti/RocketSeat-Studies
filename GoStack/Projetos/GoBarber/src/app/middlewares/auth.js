// middleware de verificacao se o user esta autenticado ou nao

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user
    return next()
  }

  return res.redirect('/')
}
