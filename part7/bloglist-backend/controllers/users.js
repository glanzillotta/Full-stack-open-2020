import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { Router } from 'express'
const usersRouter = Router()

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    like: 1,
  })
  res.status(200).json(users.map((user) => user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const saltRounds = 10

  if (
    req.body.password === undefined ||
    req.body.username === undefined
  )
    return res
      .status(400)
      .send({ error: 'username and password are required' })
      .end()

  if (req.body.password.length < 3)
    return res
      .status(400)
      .send({ error: 'password must have at least 3 characters' })
      .end()

  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

  const user = new User({
    username: req.body.username,
    name: req.body.name,
    passwordHash,
  })

  const userSaved = await user.save()
  res.status(201).json(userSaved.toJSON())
})

export default usersRouter
