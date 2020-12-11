import React from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const LoggedinPage = ({
  user,
  handleLogout,
  createNewBlog,
  blogs,
  blogFormRef,
  updateBlog,
  deleteBlog,
}) => {
  return (
    <>
      <h3 className="userLoggedIn">{user.name} logged in</h3>
      <button className="logout" type="button" onClick={handleLogout}>
        Logout
      </button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      <div className="allBlogs">
        {blogs
          .sort((a, b) => {
            return a.likes - b.likes;
          })
          .map((blog) => {
            return (
              <Blog
                key={blog.id}
                blog={blog}
                user={user.name}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            );
          })}
      </div>
    </>
  );
};
export default LoggedinPage;
