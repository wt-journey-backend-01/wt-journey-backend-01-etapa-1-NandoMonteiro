const express = require('express')
const path = require('path')

const lanches = require('./public/data/lanches.json') 

const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/sugestao', (req, res) => {
  const { nome, ingredientes } = req.query

  if (!nome || !ingredientes) {
    return res.status(400).send('Por favor, forneça um nome e ingredientes para a sugestão.')
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Sugestão - DevBurger</title>
        <link rel="stylesheet" href="/css/style.css">
      </head>
      <body>
        <h1>Obrigado pela sugestão!</h1>
        <p><strong>Nome do lanche sugerido:</strong> ${nome}</p>
        <p><strong>Ingredientes:</strong> ${ingredientes}</p>
        <p>Agradecemos muito sua contribuição para a DevBurger!.</p>
        <a href="/">Voltar para a Página Inicial</a>
      </body>
    </html>
    `)
})

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contato.html'))
})

app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body

  const params = new URLSearchParams({ nome, email, assunto, mensagem }).toString()

  res.redirect(303, `/contato-recebido?${params}`)
})

app.get('/contato-recebido', (req, res) => {
  const { nome, email, assunto, mensagem } = req.query

  res.send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <title>Contato - DevBurger</title>
          <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
          <h1>Mensagem recebida!</h1>
          <p>Nome: <b>${nome || ''}</b></p>
          <p>E-mail: <b>${email || ''}</b></p>
          <p>Assunto: <b>${assunto || ''}</b></p>
          <p>Mensagem: <b>${mensagem || ''}</b></p>
          <a href="/">Voltar ao início</a>
        </body>
      </html>
    `)
})

app.get('/api/lanches', (req, res) => {
  // Envia o JSON diretamente, sem precisar ler o arquivo com fs
  res.json(lanches)
})

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
})

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`)
})