const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const verificaIdade = (req, res, next) => {
  const { idade } = req.query
  if (!idade) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('form')
})

app.get('/maior', verificaIdade, (req, res) => {
  const { idade } = req.query
  return res.render('maior', { idade })
})

app.get('/menor', verificaIdade, (req, res) => {
  const { idade } = req.query
  return res.render('menor', { idade })
})

app.post('/checar', (req, res) => {
  const { idade } = req.body

  if (idade >= 18) {
    return res.redirect(`/maior?idade = ${req.body.idade}`)
  } else {
    return res.redirect(`/menor?idade = ${req.body.idade}`)
  }
})

app.listen(3001)
