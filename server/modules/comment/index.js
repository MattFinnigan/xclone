const express = require('express')
const commentController = require('./controller')
const router = express.Router()
const { verifyToken } = require('../../middleware/auth')

router.get('/', commentController.getComments)
router.post('/', verifyToken, commentController.addComment)
module.exports = router