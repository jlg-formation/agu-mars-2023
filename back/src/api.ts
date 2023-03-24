import express from 'express'
import { Article, NewArticle } from './interfaces/article'

const generateId = () => {
  return Date.now() + '_' + Math.round(Math.random() * 1e12)
}

const articles: Article[] = [
  { id: 'a1', name: 'Pelle', price: 3.99, qty: 123 },
  { id: 'a2', name: 'Marteau', price: 5, qty: 34 },
]

const app = express.Router()

app.use((req, res, next) => {
  setTimeout(next, 500)
})

app.get('/date', (req, res) => {
  res.json({
    date: new Date(),
  })
})

app.get('/articles', (req, res) => {
  res.json(articles)
})

app.use(express.json())

app.post('/articles', (req, res) => {
  const newArticle: NewArticle = req.body
  const article = { ...newArticle, id: generateId() }
  articles.push(article)
  res.status(201).end()
})

export default app
