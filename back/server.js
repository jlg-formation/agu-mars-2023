console.log('About to start a server')

const express = require('express')
const serveIndex = require('serve-index')
const app = express()
const port = 3000

app.use((req, res, next) => {
  console.log('url:', req.path)
  next()
})

app.use(express.static('.'))
app.use(serveIndex('.', { icons: true }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
