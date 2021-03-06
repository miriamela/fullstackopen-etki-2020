import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const [buttonText, setButtonText] = useState("view");
  const showDetails = { display: visible ? "" : "none", listStyle: "none" };
  const blogStyle = {
    border: "2px solid black",
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5,
  };

  const showUser = () => {
    if (blog.user) {
      if (blog.user.name === user) {
        return (
          <div>
            <p>{blog.user.name}</p>
            <button type="button" onClick={removeBlog}>
              remove
            </button>
          </div>
        );
      } else {
        return <p>{blog.user.name}</p>;
      }
    }
  };
  const toggleVisibility = () => {
    setVisible(!visible);
    if (buttonText === "view") {
      setButtonText("hide");
    } else {
      setButtonText("view");
    }
  };
  const increaseLikes = (event) => {
    event.preventDefault();
    updateBlog(blog.id);
  };
  const removeBlog = (event) => {
    event.preventDefault();
    deleteBlog(blog.id);
  };

  return (
    <section style={blogStyle}>
      <div className="blog">
        {blog.title}, {blog.author} {""}
        <button id="showHide" type="button" onClick={toggleVisibility}>
          {buttonText}
        </button>
      </div>
      <section className="details" style={showDetails}>
        <p>{blog.url}</p>
        <p>
          likes <span className="likeNumber">{blog.likes}</span>{" "}
          <button id="buttonLikes" type="button" onClick={increaseLikes}>
            like
          </button>
        </p>
        {showUser()}
      </section>
    </section>
  );
};

export default Blog;
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  updateBlog: PropTypes.func.isRequired,
  // deleteBlog: PropTypes.func.isRequired,
};
