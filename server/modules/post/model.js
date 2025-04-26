const { DataTypes } = require('sequelize')
const sequelize = require('../../configs/db')
const temp = require('../../configs/temp')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  reposted_post_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Posts',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  canDelete: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.user_id === parseInt(temp.userId)
    }
  }
})

Post.prototype.toggleLike = async function (userId) {
  const likes = await fetchPostLikes(this)
  const liked = likes.some((like) => like.user_id === parseInt(userId))
  if (liked) {
    await sequelize.query(
      'DELETE FROM post_likes WHERE post_id = ? AND user_id = ?',
      {
        replacements: [this.id, userId],
        type: sequelize.QueryTypes.DELETE
      }
    )
  } else {
    await sequelize.query(
      'INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)',
      {
        replacements: [this.id, userId],
        type: sequelize.QueryTypes.INSERT
      }
    )
  }
}

Post.associate = (models) => {
  Post.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  })
  Post.belongsTo(models.Post, {
    foreignKey: 'reposted_post_id',
    as: 'repostedPost'
  })
  Post.hasMany(models.Comment, {
    foreignKey: 'post_id',
    as: 'comments',
    onDelete: 'CASCADE',
    hooks: true
  })
}

Post.afterFind((model) => {
  const posts = Array.isArray(model) ? model : [model]
  posts.forEach(async (post) => {
    post.dataValues.likes = await fetchPostLikes(post) 
    post.dataValues.liked = post.dataValues.likes.some((like) => like.user_id === parseInt(temp.userId))
  })
})

async function fetchPostLikes (post) {
  return await sequelize.query(
    'SELECT * FROM post_likes WHERE post_id = ?',
    {
      replacements: [post.dataValues.id],
      type: sequelize.QueryTypes.SELECT
    }
  )
}

module.exports = Post