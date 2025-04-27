const { Post, User } = require('../index')

exports.createComment = (data) => {
  return Post.create({ ...data, comment_post_id: data.post_id })
}

exports.getComments = (postId) => {
  return Post.findAll({
    where: { comment_post_id: postId },
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
  return Post.findByPk(id)
}

exports.deleteComment = (id) => {
  return Post.destroy({
    where: { id }
  })
}