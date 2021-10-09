const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    return res.json({ response: false })
  }
}

module.exports = isAdmin
