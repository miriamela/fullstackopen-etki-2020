import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateLikes } from "../reducers/blogsReducer";
import { deleteBlog } from "../reducers/blogsReducer";
import blogService from "../services/blog";

const SingleBlog = () => {
  const history = useHistory();
  const id = useParams().id;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((each) => each.id === id);

  if (!blog) {
    return null;
  }
  const increaseLikes = (event) => {
    event.preventDefault();
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      dispatch(updateLikes(blog.id, updatedBlog));
    } catch (error) {
      console.log(error);
    }
  };
  const removeBlog = (event) => {
    event.preventDefault();
    try {
      const confirmation = window.confirm(
        // eslint-disable-next-line prettier/prettier
        `Remove ${blog.title} by ${blog.author}`
      );
      if (confirmation) {
        blogService.setToken(user.token);
        dispatch(deleteBlog(blog.id, blog));
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showDeleteButton = () => {
    if (user.name === blog.user.name) {
      return (
        <button type="button" onClick={removeBlog}>
          Delete
        </button>
      );
    }
  };
  return (
    <div>
      <h3>{blog.title}</h3>
      <a>{blog.url}</a>
      <p>
        likes <span className="likeNumber">{blog.likes}</span>{" "}
        <button id="buttonLikes" type="button" onClick={increaseLikes}>
          like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
      {showDeleteButton()}
    </div>
  );
};
export default SingleBlog;
