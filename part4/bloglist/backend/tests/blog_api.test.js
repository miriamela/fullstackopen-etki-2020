const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared");

  const initialArray = helper.initialBlogs.map((blog) => new Blog(blog));
  const blogs = await initialArray.map((blog) => blog.save());
  await Promise.all(blogs);
  console.log("saved");
});
console.log("done");

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("return all blogs", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blogs have id property", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const blogs = response.body;
  for (let i = 0; i < blogs.length; i++) {
    expect(blogs[i].id).toBeDefined();
  }
});

test("a new blog post can be added", async () => {
  const newBlog = {
    title: "Avoiding Memory Leaks With CanJS",
    author: "Sebastian",
    url:
      "http://sporto.github.io/blog/2014/03/20/avoiding-memory-leaks-with-canjs/",
    likes: 7,
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogsAtEnd = await helper.blogsInDB();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const title = blogsAtEnd.map((x) => x.title);
  const author = blogsAtEnd.map((x) => x.author);
  const newOne = response.body;

  expect(title).toContain(newOne.title);
  expect(author).toContain(newOne.author);
  expect(newOne.likes).toBeDefined();
});
test("if likes is missing default to 0", async () => {
  const response = await api
    .post("/api/blogs")
    .send({
      title: "Blog without likes",
      author: "Miriam Grossi",
      url: "blablabla",
    })
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const newOne = response.body;
  expect(newOne.likes).toBe(0);
});
test("if missing title or url return 404", async () => {
  await api
    .post("/api/blogs")
    .send({ author: "Miriam Grossi", likes: 3 })
    .expect(404);
});
afterAll(() => {
  mongoose.connection.close();
});
