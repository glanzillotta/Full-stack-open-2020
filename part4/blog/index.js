import http from 'http'
import {PORT} from './utils/config.js'
import {info} from './utils/logger.js'
import app from './app.js'

const server = http.createServer(app)

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})