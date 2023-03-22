const fs = require('fs');
const path = require("path");

const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())


app.get('/episodio/:id', (req, res) => {
  let rawdata = fs.readFileSync( path.resolve("database", "teste", "zatch_bell.json")) 
  let json = JSON.parse(rawdata)
  res.send(json)
})

app.get('/index/popular', (req, res) => {
  let rawdata = fs.readFileSync( path.resolve("database", "teste", "zatch_bell.json")) 
  let json = JSON.parse(rawdata)
  let popular = {
    animes:[
      json,
      json, 
      json
    ]
  }
  res.send(popular)
})

app.get('*', (req, res) => {
  res.send({message: 'Endpoint não configurado!', error: 404})
})

// Export the Express API
module.exports = app