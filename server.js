const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require("helmet")
const hpp = require('hpp')
const { logError } = require('./utils/error')
const app = express()


function init() {
    app.use(helmet())
    app.use(bodyParser.json())
    app.use(hpp())
    initRoutes(app)

    /*    
    app.listen("5025", () => {
        console.log(`Server UP on port 5025`)
    })*/
    
    app.get('*', (req, res) => {
        res.status(404).send({message: 'Endpoint não configurado!', error: 404})
    })

    return app
}

function initRoutes(app) {
    try {
        fs.readdirSync("./routes").forEach((file) => {
            const route = require(path.join(__dirname, 'routes', file))
            if (route.init) {
                route.init()
            } else {
                console.log(`A rota ${file} não possui uma função 'init'.`)
            }
            const routePath = '/' + path.basename(file, path.extname(file))
            console.log(routePath, " routePath");
            app.use(route.router)
        })
    } catch (error) { logError(error, __filename) }
}

module.exports = {
    init
}