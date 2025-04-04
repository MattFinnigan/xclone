const Sequelize = require('sequelize')
const sequelize = require('../configs/db')

const User = require('./user/model')
const Post = require('./post/model')

const models = { User, Post }

// Run associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models)
  }
})

module.exports = models
