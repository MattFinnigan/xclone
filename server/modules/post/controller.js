const postService = require('./service')

exports.addPost = async (req, res) => {
  try {
    const data = req.body
    const newPost = await postService.createPost(data)
    res.status(200).json({
      status: 'success',
      message: 'Post created successfully.',
      data: newPost
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Error creating post.' })
  }
}

exports.getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts()
    res.status(200).json({
      status: 'success',
      message: 'Posts retrieved successfully.',
      data: posts
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Error retrieving posts.' })
  }
}

exports.fetchPost = async (req, res) => {
  try {
    const postId = req.params.postId
    const post = await postService.getPostById(postId)
    if (!post) {
      return res.status(404).json({ status: 'error', message: 'Post not found.' })
    }
    res.status(200).json({
      status: 'success',
      message: 'Post retrieved successfully.',
      data: post
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Error retrieving post.' })
  }
}

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId
    const deletedPost = await postService.deletePost(postId)
    if (!deletedPost) {
      return res.status(404).json({ status: 'error', message: 'Post not found.' })
    }
    res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully.',
      data: deletedPost
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Error deleting post.' })
  }
}

exports.toggleLike = async (req, res) => {
  try {
    const postId = req.params.postId
    const userId = req.userId
    const post = await postService.toggleLike(postId, userId)
    if (!post) {
      return res.status(404).json({ status: 'error', message: 'Post not found.' })
    }
    res.status(200).json({
      status: 'success',
      message: 'Post like toggled successfully.',
      data: post
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Error liking/unliking post.' })
  }
}