import { hello } from './routes/hello'

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.post('/', (req, res) => {
  res.send(hello(req.body))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})