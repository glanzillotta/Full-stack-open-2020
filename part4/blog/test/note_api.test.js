import "core-js/stable";
import "regenerator-runtime/runtime";
import { connection } from "mongoose";
import supertest from "supertest";
import app from "../app.js";

const api = supertest(app);

test("blogs returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs return correct amount of blog post", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(1);
});

afterAll(() => {
  connection.close();
});
