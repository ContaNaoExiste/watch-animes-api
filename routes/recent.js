const express = require('express')
const { getListAnimesRecentlyAdded } = require('../utils/utils')
const { logError } = require('../utils/error')
const router = express.Router()

function init() {

    router.get('/recent', (req, res) => {
        try {
            res.send(getListAnimesRecentlyAdded(req.params.query))
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