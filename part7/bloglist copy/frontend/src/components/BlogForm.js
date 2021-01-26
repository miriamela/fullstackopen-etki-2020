/* eslint-disable prettier/prettier */
import React from "react";
import blogService from "../services/blog";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";

const BlogForm = ({ blogFormRef, user }) => {
  const dispatch = useDispatch();
  const displayBlock = { display: "block" };
  const addBlog = async (event) => {
    event.preventDefault();
    const newObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
    try {
      blogFormRef.current.toggleVisibility();
      blogService.setToken(user.token);
      dispatch(createBlog(newObject));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog} className="form" method="post">
        <label htmlFor="title">title:</label>
        <input type="text" id="title" name="title"></input>
        <label htmlFor="author">author:</label>
        <input type="text" id="author" name="author"></input>
        <label htmlFor="url">url:</label>
        <input type="text" id="url" name="url"></input>
        <button id="createButton" type="submit" style={displayBlock}>
          create
        </button>
      </form>
    </>
  );
};
export default BlogForm;

// BlogForm.propTypes = {
//   createNewBlog: PropTypes.func.isRequired,
// };
