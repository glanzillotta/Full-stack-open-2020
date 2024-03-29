import { info, error } from './logger.js'

const requestLogger = (request, response, next) => {
  info('Method:', request.method)
  info('Path:  ', request.path)
  info('Body:  ', request.body)
  info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, request, response, next) => {
  error(err.message)

  if (err.name === 'CastError')
    return response.status(400).send({ error: 'malformatted id' })
  else if (err.name === 'ValidationError')
    return response.status(400).json({ error: err.message })
  else if (err.name === 'JsonWebToken')
    return response.status(401).json({ error: 'invalid token' })
  else if (error.name === 'JsonWebTokenError')
    return response.status(401).json({ error: 'invalid token' })

  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    req.token = authorization.substring('bearer '.length)

  next()
}

export { requestLogger, unknownEndpoint, errorHandler, tokenExtractor }
