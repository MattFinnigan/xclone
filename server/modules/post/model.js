const { DataTypes } = require('sequelize')
const sequelize = require('../../configs/db')

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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
})
Post.associate = (models) => {
  Post.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  })
}

module.exports = Post