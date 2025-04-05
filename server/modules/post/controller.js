const postService = require('./service')

exports.addPost = async (req, res, next) => {
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

exports.getPosts = async (req, res, next) => {
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