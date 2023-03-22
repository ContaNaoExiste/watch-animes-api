const fs = require('fs');
const path = require("path");

const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

const DATABASE_ANIMES = {}
const DATABASE_EPISODIOS = {}
const DATABASE_CATEGORIAS = {}

function createDatabaseLocal(){
  try {
    const files = fs.readdirSync(path.resolve("database", "animes"))
    if( files && files.length > 0){
      files.forEach(element => {
        let rawdata = fs.readFileSync(path.resolve("database", "animes", element))
        let json = JSON.parse(rawdata)
  
        DATABASE_ANIMES[json.warezcdn.imdb] = json

        if(json.imdb.genre){
          json.imdb.genre.split(",").forEach(genre => {
            if( ! DATABASE_CATEGORIAS[genre])
              DATABASE_CATEGORIAS[genre] = []

              DATABASE_CATEGORIAS[genre].push(json.warezcdn.imdb)
          });
        }
      });
    }  
  } catch (error) {
    res.send(error)
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

function searchText(query, text){
  return text.includes(query)
}

app.get('/anime/search/:q', (req, res) => {
  try {
    let animes = Object.values(DATABASE_ANIMES).filter(anime => searchText(req.params.q, anime.imdb.title))
    if( animes.length > 0){
      res.send({ 
        animes: animes
      })
    }else{
      res.send({ 
        message: "Nenhum anime encontrado!"
      })
    }
    
  } catch (error) {
   
    res.send(error.message) 
  }
})

function compareRatingStar(a, b) {
  if (a.imdb.rating_star < b.imdb.rating_star) {
    return -1;
  }
  if (a.imdb.rating_star > b.imdb.rating_star) {
    return 1;
  }
  return 0;
}

function compareRatingCount(a, b) {
  if (a.imdb.rating_count < b.imdb.rating_count) {
    return -1;
  }
  if (a.imdb.rating_count > b.imdb.rating_count) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

app.get('/index/popular', (req, res) => {
  let animes = Object.values(DATABASE_ANIMES).sort(compareRatingStar).slice(0, 6)
  
  let popular = {
    animes: animes
  }
  res.send(popular)
})

app.get('/index/trending', (req, res) => {
  let animes = Object.values(DATABASE_ANIMES).sort(compareRatingCount).slice(0, 6)
  
  let popular = {
    animes: animes
  }
  res.send(popular)
})

app.get('/genres', (req, res) => {
  let categorias = Object.keys(DATABASE_CATEGORIAS)
  
  let json = {
    categorias: categorias
  }
  res.send(json)
})

app.get('/genre/:genre', (req, res) => {
  try {
    let animes = []
    let animes_id = DATABASE_CATEGORIAS[req.params.genre]
    animes_id.forEach(element => {
      let anime = DATABASE_ANIMES[element]
      animes.push( {
        imdb : {
          image: anime.imdb.image,
          id: anime.imdb.id,
          title: anime.imdb.title,
          genre: anime.imdb.genre
        }
      })
    });
    let json = {
      animes: animes,
      genre: req.params.genre
    }
    res.send(json)  
  } catch (error) {
    res.send(error)
  }
  
})

app.get('*', (req, res) => {
  res.send({message: 'Endpoint não configurado!', error: 404})
})

// Export the Express API
module.exports = app