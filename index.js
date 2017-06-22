//Requerimentos, variáveis e constantes
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var db
//Usos de funções
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())
//Escolha de renderização
app.set('view engine', 'ejs')

//Conexão com o Servidor de Banco de Dados
MongoClient.connect('mongodb://eriking50:b3rgk4mp@ds119302.mlab.com:19302/mynewlist', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('Servidor conectado na porta 3000')
  })
})

//Método de Adição no servidor
app.post('/animes', (req, res) => {
    db.collection('animes').save(req.body, (err, result) => {
        if (err) return console.log(err)

            console.log('Dado salvo com sucesso')
            res.redirect('/')
        })
    console.log(req.body)
})

//Método de renderização do servidor
app.get('/', (req, res) => {
  db.collection('animes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {animes: result})
  })
})