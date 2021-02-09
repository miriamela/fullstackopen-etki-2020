import React from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const LoggedinPage = ({ user, blogFormRef }) => {
  const blogs = useSelector((state) => state.blogs);
  console.log(blogs);

  return (
    <>
      <h2>Blog App</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <div className="allBlogs">
        {blogs
          .sort((a, b) => {
            return b.likes - a.likes;
          })
          .map((blog) => {
            return <Blog key={blog.id} blog={blog} />;
          })}
      </div>
    </>
  );
};
export default LoggedinPage;
// LoggedinPage.propTypes = {
//   user: PropTypes.object.isRequired,
//   handleLogout: PropTypes.func.isRequired,
//   blogFormRef: PropTypes.object.isRequired,
// };
