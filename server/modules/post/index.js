const express = require('express')
const postController = require('./controller')
const router = express.Router()
const { verifyToken, verifyDeletePost } = require('../../middleware/auth')

router.get('/', postController.getPosts)
router.post('/', verifyToken, postController.addPost)
router.post('/repost', verifyToken, postController.addRepost)
router.get('/:postId', postController.fetchPost)
router.post('/:postId/like', verifyToken, postController.toggleLike)
router.delete('/:postId', verifyDeletePost, postController.deletePost)


module.exports = router