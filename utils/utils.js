const { logError } = require("./error");
const fs = require('fs')
const path = require('path')

const STR_DATABASE_CATEGORIAS = "DATABASE_CATEGORIAS"
const STR_DATABASE_ANIMES = "DATABASE_ANIMES"

function searchText(query, text){
    return text.toLowerCase().includes(query.toLowerCase())
}
  
  
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

function reduceInfoAnime( json ){
    return {
        imdb: {
            image: json.imdb.image || path.resolve("images", "not_found.png"),
            id: json.imdb.id,
            title: json.imdb.title,
            genres: (json.imdb.genre || []).split(",") 
        }
    }
}

function loadLocalDatabase(){
    try {
        
        const DATABASE_CATEGORIAS = {}
        const DATABASE_ANIMES = {}

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
        
                        DATABASE_CATEGORIAS[genre].push(reduceInfoAnime(json))
                    });
                }
            });
        } 
        localStorage.setItem(STR_DATABASE_CATEGORIAS, DATABASE_CATEGORIAS)
        localStorage.setItem(STR_DATABASE_ANIMES, DATABASE_ANIMES)

    } catch (error) {
        logError(error, __filename)
    }
}

function getListGenres(){
    const categorias =  localStorage.getItem(STR_DATABASE_CATEGORIAS)
    if( !categorias) return {}
    return {
        categorias: Object.keys(categorias) 
    }
}

function getListAnimesByGenre(genre){
    if( ! genre) return {}
    
    const categorias =  localStorage.getItem(STR_DATABASE_CATEGORIAS)
    if( !categorias) return {}
    
    const animes = categorias[genre]
    if( ! animes) return {}

    return {
        animes: animes,
        genre: genre
    } 
}

function getListAnimesBySearch(query){
    const animes = localStorage.getItem(STR_DATABASE_ANIMES)
    if( ! animes) return null

    let search_id = []
    if( query )
        search_id = Object.values(animes).filter(anime => searchText(query, anime.imdb.title))
    else
        search_id = Object.values(animes)
    
    let result = []
    search_id.forEach(element => {
        result.push( reduceInfoAnime(element))
    });

    if( ! result.length ) return {}

    return { 
      animes: result
    }
}

function getAnimeByIMDB( imdb ){
    if( ! imdb) return {}
    
    const animes =  localStorage.getItem(STR_DATABASE_ANIMES)
    if( !animes) return {}
    
    const anime = animes[imdb]
    if( ! anime) return {}

    return {
        anime: anime
    } 
}

function getListAnimes( ){
    return getListAnimesBySearch(null)
}

function getListAnimesSlideShow(){

    return {}
}

module.exports = {
    loadLocalDatabase,
    getListGenres,
    getListAnimesByGenre,
    getListAnimesBySearch,
    getAnimeByIMDB,
    getListAnimes,
    getListAnimesSlideShow
}