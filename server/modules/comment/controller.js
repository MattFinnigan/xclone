const commentService = require('./service')

exports.addComment = async (req, res, next) => {
  try {
    const data = req.body
    const newComment = await commentService.createComment(data)
    res.status(200).json({
      status: 'success',
      message: 'Comment created successfully.',
      data: newComment
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Error creating comment.' })
  }
}

exports.getComments = async (req, res, next) => {
  try {
    const comments = await commentService.getComments(req.params.postId)
    res.status(200).json({
      status: 'success',
      message: 'Comments retrieved successfully.',
      data: comments
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Error retrieving comments.' })
  }
}