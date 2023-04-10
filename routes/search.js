const express = require('express')
const { getListAnimesBySearch } = require('../utils/utils')
const { logError } = require('../utils/error')
const router = express.Router()

function init() {

    router.get('/search/:query', (req, res) => {
        try {
            res.send(getListAnimesBySearch(req.params.query))
        } catch (error) {
            logError(error, __filename)
            res.send(error) 
        }
    })
    
    router.get('/search/', (req, res) => {
        try {
            res.send(getListAnimesBySearch(req.params.query))
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