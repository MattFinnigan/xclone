import dbConfig from '../configs/db'

const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV])
// Establish the database connection
sequelize.sync().then(() => {
  console.log('✔ Database connected successfully.')
}).catch((err) => {
  console.error('✘ Error connecting to the database:', err)
})
module.exports = sequelize
