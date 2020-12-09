import React, { useState } from "react";

const Blog = ({ blog, user }) => {
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

  const toggleVisibility = () => {
    setVisible(!visible);
    if (buttonText === "view") {
      setButtonText("hide");
    } else {
      setButtonText("view");
    }
  };
  return (
    <section style={blogStyle}>
      <div>
        {blog.title}, {blog.author} {""}
        <button type="button" onClick={toggleVisibility}>
          {buttonText}
        </button>
      </div>
      <section className="details" style={showDetails}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{" "}
          <button
            type="button"
            onClick={() => {
              console.log("click");
            }}
          >
            like
          </button>
        </p>
        <p>{user}</p>
      </section>
    </section>
  );
};

export default Blog;
