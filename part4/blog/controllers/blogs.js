import Blog from "../models/blog.js";
import { Router } from "express";
const blogsRouter = Router();

blogsRouter.get("/", async (request, response) => {
  const blogFound = await Blog.find({});
  response.status(200).json(blogFound);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  if (request.body.title === undefined || request.body.url === undefined)
    return response.status(400).end();

  if (request.body.likes === undefined) blog.likes = 0;

  const blogSaved = await blog.save();
  response.status(201).json(blogSaved);
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
