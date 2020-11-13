import User from "../models/user.js";
import bcrypt from "bcrypt";
import { Router } from "express";
const usersRouter = Router();

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    like: 1,
  });
  response.status(200).json(users.map((user) => user.toJSON()));
});

usersRouter.post("/", async (request, response) => {
  const saltRounds = 10;

  if (
    request.body.password === undefined ||
    request.body.username === undefined
  )
    return response
      .status(400)
      .send({ error: "username and password are required" })
      .end();

  if (request.body.password.length < 3)
    return response
      .status(400)
      .send({ error: "password must have at least 3 characters" })
      .end();

  const passwordHash = await bcrypt.hash(request.body.password, saltRounds);

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash,
  });

  const userSaved = await user.save();
  response.status(201).json(userSaved).end();
});

export default usersRouter;
