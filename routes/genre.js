const express = require('express')
const { getListGenres, getListAnimesByGenre } = require('../utils/utils')
const { logError } = require('../utils/error')
const router = express.Router()

function init() {

    router.get('/genres', (req, res) => {  
        try {
            res.send(getListGenres())   
        } catch (error) {
            logError(error, __filename)
            res.send(error)
        }
    })

    router.get('/genre/:genre/animes', (req, res) => {
        try {
            res.send(getListAnimesByGenre(req.params.genre))  
        } catch (error) {
            logError(error, __filename)
            res.send(error)
        }
    })
    
    router.get('/genre/:genre', (req, res) => {
        try {
            res.send(getListAnimesByGenre(req.params.genre))  
        } catch (error) {
            logError(error, __filename)
            res.send(error)
        }
    })
}

module.exports = {
    router,
    init
}