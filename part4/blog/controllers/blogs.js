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

export default blogsRouter;
