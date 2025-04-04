const userService = require('./service')

exports.addUser = async (req, res, next) => {
  try {
    const userData = req.body
    const newUser = await userService.createUser(userData)
    res.status(200).json({
      status: 'success',
      message: 'User created successfully.',
      data: {
        newUser
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Error creating user.' })
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await userService.getUserById(userId)
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found.' })
    }
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    })
  }
  catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Error fetching user.' })
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers(req.query)
    res.status(200).json({
      status: 'success',
      data: {
        users
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Error fetching users.' })
  }
}