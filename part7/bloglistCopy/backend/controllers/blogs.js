const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate("comments", {
      content: 1,
    })
    .populate("user", { username: 1, name: 1 });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  let decodedToken;
  const token = getTokenFrom(request);
  if (!token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  // console.log(user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user,
  });

  if (!(body.title || body.url)) {
    return response.status(404).json({ error: "missing title or url" });
  }
  const savedBlog = await blog.save();
  console.log(`${blog.title} has been saved!`);

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!(token || decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);
  const user = await User.findById(decodedToken.id);
  const comments = blog.id;
  // console.log(user, blog, comments);
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(blog);
    await Comment.deleteMany({ blog: comments });
    console.log(`${blog.title} has been deleted`);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: "token missing or invalid" });
  }
});
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const newLikes = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    newLikes,
    {
      new: true,
    }
  )
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });
  response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;
  try {
    const blog = await Blog.findById(request.params.id)
      .populate("user", { url: 1, username: 1, name: 1 })
      .populate("comments", { content: 1 });
    console.log(blog);
    const comment = new Comment({
      content: body.content,
      blog: blog._id,
    });
    const savedComment = await comment.save();
    console.log(`new comment has been saved!`);
    blog.comments = blog.comments.concat(savedComment);
    await blog.save();
    response.json(blog);
  } catch (error) {
    console.log(`error: ${error}`);
  }
});
module.exports = blogsRouter;
