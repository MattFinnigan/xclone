const { Comment, Post, User } = require('../index')

exports.createComment = (data) => {
  return Comment.create(data)
}

exports.getComments = (postId) => {
  return Comment.findAll({
    where: { post_id: postId },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'avatar', 'handle']
      }
    ]
  })
}

exports.getCommentById = (id) => {
  return Comment.findByPk(id)
}
