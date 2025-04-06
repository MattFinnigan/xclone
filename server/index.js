const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(8080, () => { console.log('Server is running on http://localhost:8080') })

app.get('/', (req, res) => { res.send('Hello World!') })

app.use('/api/auth', require('./modules/auth'))
app.use('/api/users', require('./modules/user'))
app.use('/api/posts', require('./modules/post'))
app.use('/api/comments', require('./modules/comment'))