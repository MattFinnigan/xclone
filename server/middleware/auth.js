const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req, res, next) {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ error: 'Access denied' })
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    req.userId = decoded.userId
    next()
  })
}

module.exports = verifyToken;