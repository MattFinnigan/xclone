const express = require('express')
const userController = require('./controller')
const router = express.Router()
const { verifyToken } = require('../../middleware/auth')

router.post('/create', userController.addUser)
router.get('/list', verifyToken, userController.getAllUsers)
module.exports = router