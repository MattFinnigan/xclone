const express = require('express')
const userController = require('./controller')
const router = express.Router()

router.post('/create', userController.addUser)
router.get('/profile/:userId', userController.getProfile)
module.exports = router