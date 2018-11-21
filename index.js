// const http = require('nome-da-biblioteca');
const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const checkMidlleware = (req, res, next) => {
  const age = req.body.age
  if (age == 0) return res.redirect('/')
  else next()
}

app.get('/', (req, res) => {
  return res.render('main')
})

app.use(checkMidlleware)

app.get('/major', (req, res) => {
  return res.render('major')
})

app.get('/minor', (req, res) => {
  return res.render('minor')
})

app.post('/check', (req, res) => {
  const idade = req.body.age
  if (idade > 17) return res.render('major', { idade })
  else return res.render('minor', { idade })
})

app.listen(3000)
