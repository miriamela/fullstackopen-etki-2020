/* eslint-disable prettier/prettier */
import React from "react";
import blogService from "../services/blog";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";
import { Form, Button } from "react-bootstrap";

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
      // this reload is because of the issue saving the blog with the user id number but not loading immediately
      // the user information, without it the user name iis not immediately showed along with the delete button...
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={addBlog} className="form" method="post">
        <h5>Create new blog</h5>
        <Form.Label htmlFor="title">title:</Form.Label>
        <Form.Control type="text" id="title" name="title"></Form.Control>
        <Form.Label htmlFor="author">author:</Form.Label>
        <Form.Control type="text" id="author" name="author"></Form.Control>
        <Form.Label htmlFor="url">url:</Form.Label>
        <Form.Control type="text" id="url" name="url"></Form.Control>
        <Button
          className="btn btn-primary btn-sm"
          id="createButton"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  );
};
export default BlogForm;
