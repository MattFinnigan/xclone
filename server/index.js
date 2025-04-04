const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const userRoutes = require('./modules/user')
const authRoutes = require('./modules/auth')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(8080, () => { console.log('Server is running on http://localhost:8080') })

app.get('/', (req, res) => { res.send('Hello World!') })

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)