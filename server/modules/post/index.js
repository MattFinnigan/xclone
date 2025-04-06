const express = require('express')
const postController = require('./controller')
const router = express.Router()
const verifyToken = require('../../middleware/auth')

router.get('/', postController.getPosts)
router.get('/:postId', postController.fetchPost)
router.post('/', verifyToken, postController.addPost)
module.exports = router