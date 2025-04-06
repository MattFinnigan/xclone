const User = require('./user/model')
const Post = require('./post/model')
const Comment = require('./comment/model')
const models = { User, Post, Comment }

// Run associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models)
  }
})

module.exports = models
