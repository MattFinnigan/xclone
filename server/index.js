const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
console.log(app)

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})