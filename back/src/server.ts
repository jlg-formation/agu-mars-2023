console.log('About to start a server')

import express, { NextFunction, Request, Response } from 'express'
import serveIndex from 'serve-index'
import api from './api'
const app = express()
const port = 3000

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('url:', req.path)
  next()
}

app.use(logger)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  // res.setHeader('', '')
  next()
})

app.use('/api', api)

app.use(express.static('.'))
app.use(serveIndex('.', { icons: true }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
