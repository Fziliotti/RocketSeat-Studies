module.exports = (req, res, next) => {
  // se tiver session e se nao existir o usuario
  if (req.session && !req.session.user) {
    return next()
  }
  // se tiver sessao mas se o usuario ja existir
  return res.redirect('/app/dashboard')
}
