import React from "react";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import BlogTitle from "./BlogTitle";

const LoggedinPage = ({ blogFormRef }) => {
  const blogs = useSelector((state) => state.blogs);
  console.log(blogs);

  return (
    <div className="container">
      <h2>Blog App</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <ul className="list-group" style={{ marginTop: "20px" }}>
        {blogs
          .sort((a, b) => {
            return b.likes - a.likes;
          })
          .map((blog) => {
            return (
              <li key={blog.id} className="list-group-item">
                <BlogTitle key={blog.id} blog={blog} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default LoggedinPage;
LoggedinPage.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
};
