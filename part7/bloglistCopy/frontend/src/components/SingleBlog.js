import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateLikes } from "../reducers/blogsReducer";
import { deleteBlog } from "../reducers/blogsReducer";
import blogService from "../services/blog";
import { updateComments } from "../reducers/blogsReducer";

const SingleBlog = () => {
  const history = useHistory();
  const id = useParams().id;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((each) => each.id === id);
  console.log(blog);
  if (!blog) {
    return null;
  }
  const increaseLikes = (event) => {
    event.preventDefault();
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      dispatch(updateLikes(blog.id, updatedBlog));
      window.location.reload();
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
  const addComment = (event) => {
    event.preventDefault();
    const newComment = {
      content: event.target.comment.value,
    };
    console.log(newComment);
    dispatch(updateComments(blog.id, newComment));
    // same issue of adding a blog... it needs to reload to see it listed...
    window.location.reload();
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
      <h3>comments</h3>
      <form method="POST" onSubmit={addComment}>
        <input type="text" id="comment" name="comment"></input>
        <button type="submit">add comment</button>
        <ul>
          {blog.comments.map((each) => (
            <li key={each.id}>{each.content}</li>
          ))}
        </ul>
      </form>
    </div>
  );
};
export default SingleBlog;
