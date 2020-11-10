const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
// const Blog = require("../models/blog");

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 11 notes and they are json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toHaveLength(11);
});

test("blogs have id property", async () => {
  const response = await api
    .get("./api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body[0].id).toBeDefined();
});
afterAll(() => {
  mongoose.connection.close();
});
