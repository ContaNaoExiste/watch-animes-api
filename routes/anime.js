const express = require('express')
const { getListAnimes, getAnimeByIMDB } = require('../utils/utils')
const router = express.Router()

function init() {

    router.get('/anime/:imdb', (req, res) => {
        res.send(getAnimeByIMDB(req.params.imdb))
    })

    router.get('/animes', (req, res) => {
        res.send(getListAnimes())
    })
}

module.exports = {
    router,
    init
}