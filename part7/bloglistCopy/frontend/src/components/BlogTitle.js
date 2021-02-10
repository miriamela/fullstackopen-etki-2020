/* eslint-disable prettier/prettier */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogTitle = ({ blog }) => {
  const blogStyle = {
    border: "2px solid black",
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5,
    minWidth: "50%",
  };

  return (
    <section style={blogStyle}>
      <div className="blog">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author} {""}
      </div>
    </section>
  );
};

export default BlogTitle;
BlogTitle.propTypes = {
  blog: PropTypes.object.isRequired,
};
