const { Post, User, Comment } = require('../index')

const createPost = (data) => {
  return Post.create(data)
}

const getPosts = () => {
  return Post.findAll({
    order: [['createdAt', 'DESC']],
    include: [{
      model: User,
      attributes: ['name', 'avatar', 'handle'],
      as: 'user'
    },
    {
      model: Comment,
      include: {
        model: User,
        attributes: ['name', 'avatar', 'handle'],
        as: 'user'
      },
      as: 'comments',
      separate: true,
      order: [['createdAt', 'DESC']]
    }]
  })
}

const getPostById = async (id) => {
  const post = Post.findOne({
    where: { id },
    include: [{
      model: User,
      attributes: ['name', 'avatar', 'handle'],
      as: 'user'
    },
    {
      model: Comment,
      include: {
        model: User,
        attributes: ['name', 'avatar', 'handle'],
        as: 'user'
      },
      as: 'comments',
      separate: true,
      order: [['createdAt', 'DESC']]
    }]
  })
  return post
}

const deletePost = (id) => {
  return Post.destroy({
    where: { id }
  })
}

const toggleLike = async (postId, userId) => {
  const post = await getPostById(postId)
  if (!post) {
    console.error('Post not found')
    return null
  }
  await post.toggleLike(userId)
  const updatedPost = await getPostById(postId) 
  return updatedPost
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  toggleLike
}