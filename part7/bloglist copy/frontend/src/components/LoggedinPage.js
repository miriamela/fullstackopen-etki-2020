import React from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogOut } from "../reducers/userReducer";

const LoggedinPage = ({ user, blogFormRef }) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(userLogOut());
  };
  return (
    <>
      <h3 className="userLoggedIn">{user.name} logged in</h3>
      <button className="logout" type="button" onClick={handleLogout}>
        Logout
      </button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} user={user} />
      </Togglable>
      <div className="allBlogs">
        {blogs
          .sort((a, b) => {
            return b.likes - a.likes;
          })
          .map((blog) => {
            return <Blog key={blog.id} blog={blog} user={user} />;
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
