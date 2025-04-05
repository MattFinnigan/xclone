const User = require('./model')

exports.createUser = (userData) => {
  const randHandle = `@${userData.name.replace(/ /g, '')}${Math.floor(Math.random() * (99999999 - 1000000 + 1)) + 10000000}`
  return User.create({ ...userData, handle: randHandle })
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