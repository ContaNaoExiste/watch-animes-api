const fs = require('fs');
const path = require("path");

const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

const DATABASE_ANIMES = {}

function createDatabaseLocal(){
  try {
    const files = fs.readdirSync(path.resolve("database", "animes"))
    if( files && files.length > 0){
      files.forEach(element => {
        let rawdata = fs.readFileSync(path.resolve("database", "animes", element))
        let json = JSON.parse(rawdata)
  
        DATABASE_ANIMES[json.warezcdn.imdb] = json
      });
    }  
  } catch (error) {
    
  }
}
createDatabaseLocal()
app.get('/anime/:imdb', (req, res) => {
  try {
    res.send(DATABASE_ANIMES[req.params.imdb])
  } catch (error) {
   
    res.send(error) 
  }
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