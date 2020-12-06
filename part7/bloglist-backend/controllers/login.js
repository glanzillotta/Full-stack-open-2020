import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { SECRET } from '../utils/config.js'
import { Router } from 'express'
const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const user = await User.findOne({ username: req.body.username })

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(req.body.password, user.passwordHash)

  if (!(user && passwordCorrect))
    return res.status(401).json({ errors: 'invalid username or password' })

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

export default loginRouter
