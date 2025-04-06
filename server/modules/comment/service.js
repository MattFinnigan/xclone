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
        attributes: ['name', 'avatar', 'handle']
      }
    ],
    order: [['createdAt', 'DESC']]
  })
}

exports.getCommentById = (id) => {
  return Comment.findByPk(id)
}

exports.deleteComment = (id) => {
  return Comment.destroy({
    where: { id }
  })
}