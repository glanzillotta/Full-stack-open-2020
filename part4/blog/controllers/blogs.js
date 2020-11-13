import Blog from "../models/blog.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { Router } from "express";
const blogsRouter = Router();
import { SECRET } from "../utils/config.js";

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.status(200).json(blogs).end();
});

blogsRouter.post("/", async (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined)
    return response.status(400).end();

  const decodedToken = jwt.verify(request.token, SECRET);
  if (!(decodedToken.id || request.token))
    return response.status(401).json({ error: "token missing or invalid" });

  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog).end();
});

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  };

  const blogUpdated = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.status(200).json(blogUpdated);
});

export default blogsRouter;
