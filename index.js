const { loadLocalDatabase } = require('./utils/utils')
const { InMemoryStorage } = require('./in_memory_storage')

localStorage = new InMemoryStorage()

loadLocalDatabase()

const server = require('./server')

const app = server.init()

module.exports = app