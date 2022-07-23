// server.js
const express = require('express')
const app = express()
app.use(express.json()) // parses incoming requests with JSON payloads and is based on body-parser.

app.get('/', (req, res) => {
  res.send('This is from express.js')
})

app.get('/api', (req, res) => {
  res.json({ message: '/api' })
})

app.post('/api/login', (req, res) => {
  console.log(req.body)
  res.json({ message: '/api/login' })
})

app.listen(3001, () => {
  console.log('server started at http://localhost:3001')
})
