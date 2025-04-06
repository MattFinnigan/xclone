const { Post, User, Comment } = require('../index')

exports.createPost = (data) => {
  return Post.create(data)
}

exports.getPosts = () => {
  return Post.findAll({
    order: [['createdAt', 'DESC']],
    include: [{
      model: User,
      attributes: ['id', 'name', 'avatar', 'handle'],
      as: 'user'
    },
    {
      model: Comment,
      attributes: ['id', 'content', 'createdAt'],
      include: {
        model: User,
        attributes: ['id', 'name', 'avatar', 'handle'],
        as: 'user'
      },
      as: 'comments',
      separate: true,
      order: [['createdAt', 'DESC']]
    }]
  })
}

exports.getPostById = (id) => {
  return Post.findOne({
    where: { id },
    include: [{
      model: User,
      attributes: ['id', 'name', 'avatar', 'handle'],
      as: 'user'
    },
    {
      model: Comment,
      attributes: ['id', 'content', 'createdAt'],
      include: {
        model: User,
        attributes: ['id', 'name', 'avatar', 'handle'],
        as: 'user'
      },
      as: 'comments',
      separate: true,
      order: [['createdAt', 'DESC']]
    }]
  })
}

exports.deletePost = (id) => {
  return Post.destroy({
    where: { id }
  })
}