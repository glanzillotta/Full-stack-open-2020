import "core-js/stable";
import "regenerator-runtime/runtime";
import { connection } from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Blog from "../models/blog.js";
import { initialBlog } from "./test_helper.js";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObj = initialBlog.map((blog) => new Blog(blog));
  const promises = blogObj.map((blog) => blog.save());
  await Promise.all(promises);
});

describe("initial presence of the blogs", () => {
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
});

describe("addition of a new blog post", () => {
  test("successfully create a new blog", async () => {
    const newBlog = {
      title: "The Real Texas",
      author: "Annette Gordon-Reed",
      url: "https://getpocket.com/explore/item/the-real-texas",
      likes: 3,
    };
    const response = await api.post("/api/blogs").send(newBlog).expect(201);
    expect(response.body).toEqual(expect.objectContaining(newBlog));
  });

  test("the unique identifier property of blog post is named id", async () => {
    const response = await api.get("/api/blogs");
    await response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test("likes property is missing", async () => {
    const errLike = {
      title: "The Real Texas",
      author: "Annette Gordon-Reed",
      url: "https://getpocket.com/explore/item/the-real-texas",
    };
    const response = await api.post("/api/blogs").send(errLike);
    expect(response.body.likes).toBeGreaterThanOrEqual(0);
  });

  test("missing data from new blog ", async () => {
    const errBlog = {
      author: "Annette Gordon-Reed",
      likes: 3,
    };
    await api.post("/api/blogs").send(errBlog).expect(400);
  });
});

describe("deletion of a blog", () => {
  test("remove a blog", async () => {
    await api.delete("/api/blogs/5a422bc61b54a676234d17fc").expect(204);
  });
});

describe("modification of a blog", () => {
  test("update a blog", async () => {
    const blog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 22,
    };

    const response = await api
      .put("/api/blogs/5a422ba71b54a676234d17fb")
      .send(blog)
      .expect(200);
    expect(response.body.likes).toEqual(22);
  });
});

afterAll(() => {
  connection.close();
});
