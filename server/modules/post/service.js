const { Post, User } = require('../index')

exports.createPost = (data) => {
  return Post.create(data)
}

exports.getPosts = () => {
  return Post.findAll({
    order: [['createdAt', 'DESC']],
    include: {
      model: User,
      attributes: ['id', 'name', 'avatar'],
      as: 'user'
    }
  })
}

exports.getPostById = (id) => {
  return Post.findByPk(id)
}
