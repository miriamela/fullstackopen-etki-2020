/* eslint-disable prettier/prettier */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogTitle = ({ blog }) => {
  return (
    <section>
      <div className="blog">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author} {""}
      </div>
    </section>
  );
};

export default BlogTitle;
BlogTitle.propTypes = {
  blog: PropTypes.object.isRequired,
};
