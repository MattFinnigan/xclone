const User = require('./model')

exports.createUser = (userData) => {
  return User.create(userData)
}

exports.getUserById = (id) => {
  return User.findByPk(id)
}

exports.getAllUsers = () => {
  return User.findAll({ order: [['email', 'ASC']] })
}

exports.getUserByEmail = (email) => {
  return User.findOne({ where: { email } })
}