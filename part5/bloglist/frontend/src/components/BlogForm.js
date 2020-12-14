import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const displayBlock = { display: "block" };
  const addBlog = (event) => {
    event.preventDefault();
    createNewBlog({ title: title, author: author, url: url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog} className="form" method="post">
        <label htmlFor="title">title:</label>
        <input
          type="text"
          onChange={({ target }) => setTitle(target.value)}
          id="title"
          value={title}
          name="title"
        ></input>
        <label htmlFor="author">author:</label>
        <input
          type="text"
          onChange={({ target }) => setAuthor(target.value)}
          id="author"
          value={author}
          name="author"
        ></input>
        <label htmlFor="url">url:</label>
        <input
          type="text"
          onChange={({ target }) => setUrl(target.value)}
          id="url"
          value={url}
          name="url"
        ></input>
        <button type="submit" style={displayBlock}>
          create
        </button>
      </form>
    </>
  );
};
export default BlogForm;

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
};
