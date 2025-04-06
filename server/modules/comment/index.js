const express = require('express')
const commentController = require('./controller')
const router = express.Router()
const { verifyToken, verifyDeleteComment } = require('../../middleware/auth')

router.get('/', commentController.getComments)
router.post('/', verifyToken, commentController.addComment)
router.delete('/:commentId', verifyDeleteComment, commentController.deleteComment)
module.exports = router