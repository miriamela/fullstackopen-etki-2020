const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");
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
describe("checking blogs api", () => {
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
});

// second block, testing blogs api functionalities THIS IS NOT WORKING
describe("interactions with api", () => {
  let loggedInToken = "";
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("password", 10);
    const user = new User({
      username: "Chiara",
      name: "Chiara Manzoni",
      passwordHash,
    });
    await user.save();

    const response = await api
      .post("/api/login")
      .send({
        username: "Chiara",
        name: "Chiara Manzoni",
        password: "password",
      })
      .expect(200);

    loggedInToken = response.body.token;
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
      .set("Authorization", `bearer ${loggedInToken}`)
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
  // THIS IS NOT WORKING
  test("not adding a blog without a valid token", async () => {
    const blogsAtBeginning = await helper.blogsInDB();
    const newBlog = {
      title: "Avoiding Memory Leaks With CanJS",
      author: "Sebastian",
      url:
        "http://sporto.github.io/blog/2014/03/20/avoiding-memory-leaks-with-canjs/",
      likes: 7,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
    const blogAtEnd = await helper.blogsInDB();
    expect(blogAtEnd).toHaveLength(blogsAtBeginning.length);
  });
  // THIS IS WORKING
  test("if likes is missing default to 0", async () => {
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${loggedInToken}`)
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
      .set("Authorization", `bearer ${loggedInToken}`)
      .send({ author: "Miriam Grossi", likes: 3 })
      .expect(404);
  });
  // THIS IS NOT WORKING
  test("delete blog when id is valid", async () => {
    const blogsAtBeginning = await helper.blogsInDB();
    const blogToDelete = blogsAtBeginning[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${loggedInToken}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(blogsAtBeginning.length - 1);

    const titles = blogsAtEnd.map((x) => x.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

// third block, user creation, testing interaction with users api THIS IS WORKING
describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      username: "miriamgrossi",
      name: "Miriam Grossi",
      passwordHash,
    });

    await user.save();
  });
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test("return 404 if username or password length are not 3 characters long", async () => {
    await api
      .post("/api/users")
      .send({ username: "Mi", password: "Si", name: "Testing error" })
      .expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
