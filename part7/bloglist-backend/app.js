import cors from 'cors'
import express, { json } from 'express'
const app = express()
import 'express-async-errors'
import mongoose from 'mongoose'
const { connect } = mongoose
import { MONGODB_URI } from './utils/config.js'
import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import { NODE_ENV } from './utils/config.js'
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} from './utils/middleware.js'
import testingRouter from './controllers/testing.js'


connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

app.use(cors())
app.use(json())
app.use(requestLogger)
app.use(tokenExtractor)

if (NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

export default app
