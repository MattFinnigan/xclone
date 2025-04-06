const { DataTypes } = require('sequelize')
const sequelize = require('../../configs/db')

const Comment = sequelize.define('Comment', {
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
  post_id: {
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
  }
})
Comment.associate = (models) => {
  Comment.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  })
  Comment.belongsTo(models.Post, {
    foreignKey: 'post_id',
    as: 'post'
  })
}

module.exports = Comment