const { DataTypes } = require('sequelize')
const sequelize = require('../../configs/db')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: 'John Doe'
  },
  handle: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
})
User.associate = (models) => {
  User.hasMany(models.Post, {
    foreignKey: 'user_id',
    as: 'posts'
  })
}

module.exports = User