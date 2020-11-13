import "core-js/stable";
import "regenerator-runtime/runtime";
import { connection } from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { initialBlog, usersInDb, blogsInDb } from "./test_helper.js";

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  await user.save();

  const blogObj = initialBlog.map((blog) => new Blog(blog));
  const promises = blogObj.map((blog) => blog.save());
  await Promise.all(promises);
});

describe("user validation", () => {
  test("user returns as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("creation succeed", async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      username: "hellas",
      name: "Arto Hellas",
      password: "hellas",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const username = usersAtEnd.map((u) => u.username);
    expect(username).toContain(newUser.username);
  });

  test("creation fails with proper statuscode of a password with less than 3 characters", async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      username: "hell",
      name: "Arto Hellas",
      password: "he",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect({ error: "password must have at least 3 characters" });

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if user is not unique", async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };
    const response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toContain("`username` to be unique");

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if user doesn't have a password", async () => {
    const usersAtStart = await usersInDb();
    await api
      .post("/api/users")
      .send({ username: "DarioMocciaTwitch" })
      .expect(400);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if user doesn't have a username", async () => {
    const usersAtStart = await usersInDb();

    await api
      .post("/api/users")
      .send({ name: "DarioMocciaTwitch" })
      .expect(400);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
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

describe("validation of a blog", () => {
  test("creation succeed", async () => {
    const users = await usersInDb();
    const blogsAtStart = await blogsInDb();

    const newBlog = {
      title: "The Real Texas",
      author: "Annette Gordon-Reed",
      url: "https://getpocket.com/explore/item/the-real-texas",
      likes: 3,
    };

    const result = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${result.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: newBlog.likes,
      })
    );
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
  });

  test("unique identifier property of blog post is named id", async () => {
    const response = await api.get("/api/blogs");
    await response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test("creation succeed if the blog doesn't have explicit number of likes", async () => {
    const users = await usersInDb();
    const userId = users[users.length - 1].id;
    const errLike = {
      title: "How To Safely Store A Password",
      author: "Coda Hale",
      url: "https://codahale.com/how-to-safely-store-a-password/",
      userId: userId,
    };

    const result = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${result.body.token}`)
      .send(errLike)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test("creation fail with proper statuscode and message if blog doesn't have an url or title", async () => {
    const errBlog = {
      author: "Annette Gordon-Reed",
      likes: 3,
    };
    await api.post("/api/blogs").send(errBlog).expect(400);
  });
});

describe("deletion of a blog", () => {
  test("remotion succeed", async () => {
    const blogsAtStart = await blogsInDb();
    const blogId = blogsAtStart[blogsAtStart.length - 1].id;
    await api.delete(`/api/blogs/${blogId}`).expect(204);
    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
  });
});

describe("modification of a blog", () => {
  test("modification succeed", async () => {
    const blogsAtStart = await blogsInDb();
    const blog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 22,
    };
    const blogId = blogsAtStart.find((b) => b.title === blog.title).id;

    const response = await api
      .put(`/api/blogs/${blogId}`)
      .send(blog)
      .expect(200);
    expect(response.body.likes).toEqual(blog.likes);
  });
});

afterAll(() => {
  connection.close();
});
