import Blog from "../models/blog.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { Router } from "express";
const blogsRouter = Router();
import { SECRET } from "../utils/config.js";

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  res
    .status(200)
    .json(blogs.map((blog) => blog.toJSON()))
    .end();
});

const decodedToken = (req, res) => {
  const decodedToken = jwt.verify(req.token, SECRET);
  if (!(decodedToken.id || req.token))
    return res.status(401).json({ error: "token missing or invalid" });
  return decodedToken;
};

blogsRouter.post("/", async (req, res) => {
  if (req.body.title === undefined || req.body.url === undefined)
    return res.status(400).end();

  const deToken = decodedToken(req, res);
  const user = await User.findById(deToken.id);
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).send({ error: "Blog not found" }).end();

  const deToken = decodedToken(req, res);
  
  if ( blog.user === undefined || blog.user.toString() !== deToken.id.toString())
    return res
      .status(401)
      .send({ error: "Unauthorized user for this blog" })
      .end();
  await blog.remove();

  const user = await User.findById(deToken.id);
  user.blogs = user.blogs.filter((blog) => blog.toString() !== req.params.id);
  await user.save();
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
