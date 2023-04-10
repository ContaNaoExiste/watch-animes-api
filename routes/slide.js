const express = require('express')
const { getListAnimesSlideShow } = require('../utils/utils')
const router = express.Router()


function init() {

    router.get('/slide', (req, res) => {
        res.send(getListAnimesSlideShow())
    })
}


module.exports = {
    router,
    init
}