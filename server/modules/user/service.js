const User = require('./model')

exports.createUser = (userData) => {
  let randHandle = 0
  do {
    randHandle = `@${userData.name.replace(/ /g, '')}${Math.floor(Math.random() * (99999999 - 1000000 + 1)) + 10000000}`
  } while (User.findOne({ where: { handle: userData.handle } }))
  userData.handle = randHandle
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