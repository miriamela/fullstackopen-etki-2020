import React, { useEffect, useState, useRef } from "react";
import blogService from "./services/blog";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoggedinPage from "./components/LoggedinPage";
import "./App.css";
// import blog from "./services/blog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  // fetching all blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // local storage fetching with useEffect
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);
  console.log(blogs);

  // handle login function
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong Credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  console.log(message);
  // console.log(user, Array.isArray(user));
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    // set user to null is the only thing it is needed since it will trigger the rendering if (user === null)
    setUser(null);
  };
  // logic new blog
  const addBlog = async (newObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlogObject = await blogService.create(newObject);
      const newBlogs = blogs.concat(newBlogObject);
      setMessage(`new blog ${newBlogObject.title} has been added`);
      setBlogs(newBlogs);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h2>Blogs</h2>
      <Notification message={message} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsername={handleUsername}
          password={password}
          handlePassword={handlePassword}
        ></LoginForm>
      ) : (
        <LoggedinPage
          user={user}
          blogFormRef={blogFormRef}
          handleLogout={handleLogout}
          createNewBlog={addBlog}
          blogs={blogs}
        ></LoggedinPage>
      )}
    </div>
  );
};

export default App;
