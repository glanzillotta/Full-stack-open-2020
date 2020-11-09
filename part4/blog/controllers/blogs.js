import Blog from "../models/blog.js";
import { Router } from "express";
const blogsRouter = Router();

blogsRouter.get("/", async (request, response) => {
  const blogFound= await Blog.find({})
  response.status(200).json(blogFound);
  
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const blogSaved = await blog.save()
  response.status(201).json(blogSaved);
  
});

export default blogsRouter;
