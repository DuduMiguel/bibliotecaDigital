const express = require('express')
const app = express()
const port = 3001

const jogos = require('./jogos.js')

app.use(express.json())

app.get('/',(req,res) => {
    res.send('<h1>Bem-vindo a página inicial...</h1>')
})

app.listen( port, () => {
    console.log(`O servidor está rodando em: http://localhost:${port}`)
})

app.use('/jogos',jogos)

