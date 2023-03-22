const fs = require('fs');
const path = require("path");

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/episodios', (req, res) => {
  let rawdata = fs.readFileSync( path.resolve("database", "animes", "243_seiin_koukou_danshi_volleybu.json")) 
  let json = JSON.parse(rawdata)
  res.send(json)
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app