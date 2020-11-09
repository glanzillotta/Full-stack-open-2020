import "core-js/stable";
import "regenerator-runtime/runtime";
import { connection } from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Blog from "../models/blog.js";
import { initialBlog } from "./test_helper.js";

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of initialBlog){
        let blogObject =new Blog(blog)
        await blogObject.save()
    }
})

test("blogs returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs return correct amount of blog post", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlog.length);
});

test("the unique identifier property of blog post is named id", async () => {
  const response = await api.get("/api/blogs");
  await response.body.forEach(blog=>{
      expect(blog.id).toBeDefined()
  })
});

afterAll(() => {
  connection.close();
});
