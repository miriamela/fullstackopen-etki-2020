import React, { useEffect, useState } from "react";
import axios from "axios";
// import blogService from "./services/blog";
import Blog from "./components/Blog";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getAll = async () => {
      const res = await axios.get("http://localhost:3003/api/blogs");
      const data = await res.json();
      setBlogs(data);
    };
    getAll();
  }, [blogs]);
  return (
    <div className="App">
      <h2>Blogs</h2>
      {blogs.map((blog) => {
        return <Blog key={blog.id} blog={blog} />;
      })}
    </div>
  );
};

export default App;
