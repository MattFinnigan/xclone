const jwt = require('jsonwebtoken')
const { Post } = require('../modules/index')
const sequelize = require('../configs/db')
const temp = require('../configs/temp')
require('dotenv').config()

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ error: 'Access denied' })
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    req.userId = decoded.userId
    // temp storage
    temp.userId = decoded.userId
    next()
  })
}

const verifyDeletePost = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ error: 'Access denied' })
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    Post.findOne({
      where: { id: req.params.postId }
    }).then((post) => {
      const userId = parseInt(decoded.userId)
      if (!post) {
        return res.status(404).json({ error: 'Post not found' })
      } else if (post.user_id !== userId) {
        return res.status(403).json({ error: 'You are not authorized to delete this post' })
      }
      next()
    })
  })
}

module.exports = {
  verifyToken,
  verifyDeletePost
}