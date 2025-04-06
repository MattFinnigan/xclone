const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const userService = require('../user/service')
const { verifyToken } = require('../../middleware/auth')

router.post('/register', (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' })
  }
  userService.createUser({ name, email, password }).then((user) => {
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1hr' })
    delete user.password
    res.json({ token, user })
    return user
  }).catch((error) => {
    res.status(500).json({ error: error.message })
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }
  userService.getUserByEmail(email).then((user) => {
    if (user?.password === password) {
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1hr' })
      delete user.password
      res.json({ token, user })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  })
})

router.get('/check/:id', verifyToken, (req, res) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ error: 'Access denied' })
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }
    userService.getUserById(decoded.userId).then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      delete user.password
      res.json({ user })
    }).catch(() => {
      return res.status(500).json({ error: 'Internal server error' })
    })
  })
})

router.get('/renew/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User ID is required' })
  }
  const newToken = jwt.sign({ userId: req.params.id }, process.env.SECRET_KEY, { expiresIn: '1hr' })
  res.json({ token: newToken, userId: req.params.id })
})

module.exports = router