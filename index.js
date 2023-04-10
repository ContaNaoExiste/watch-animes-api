const { loadLocalDatabase } = require('./utils/utils')
const { InMemoryStorage } = require('./in_memory_storage')

localStorage = new InMemoryStorage()

loadLocalDatabase()

const server = require('./server')

server.init()