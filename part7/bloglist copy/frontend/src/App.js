/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from "react";
import blogService from "./services/blog";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoggedinPage from "./components/LoggedinPage";
import "./App.css";
import { useDispatch } from "react-redux";

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  // const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  // fetching all blogs
  useEffect(() => {
    const setInitialBlogs = async () => {
      const blogs = await blogService.getAll();
      console.log(blogs);
      dispatch({
        type: "RETRIEVE_ALL",
        data: blogs,
      });
    };
    setInitialBlogs();
    // blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // local storage fetching with useEffect
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);

  // handle login function
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      // blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(showNotification("Wrong Credentials", 5));
    }
  };

  // username and password
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  // logic logout
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    // set user to null is the only thing it is needed since it will trigger the rendering if (user === null)
    setUser(null);
  };

  // logic new blog
  // const addBlog = async (newObject) => {
  //   try {
  //     blogFormRef.current.toggleVisibility();
  //     blogService.setToken(user.token);
  //     const newBlogObject = await blogService.create(newObject);
  //     dispatch({
  //       type: "CREATE_BLOG",
  //       data: newBlogObject,
  //     });
  //     // const newBlogs = blogs.concat(newBlogObject);
  //     dispatch(
  //       showNotification(`new blog ${newBlogObject.title} has been added`, 5)
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // logic updating likes
  const updateBlog = async (id) => {
    const blog = blogs.find((each) => each.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    // console.log(updatedBlog);
    try {
      const newBlog = await blogService.updateLikes(id, updatedBlog);
      const newBlogs = blogs.map((blog) => (blog.id !== id ? blog : newBlog));
      setBlogs(newBlogs);
      dispatch(showNotification(`${newBlog.title}: likes has been updated`, 5));
    } catch (error) {
      console.log(error);
    }
  };

  // logic delete blog
  const deleteBlog = async (id) => {
    const blog = blogs.find((each) => each.id === id);
    try {
      const confirmation = window.confirm(
        `Remove ${blog.title} by ${blog.author}`
      );
      if (confirmation) {
        blogService.setToken(user.token);
        await blogService.remove(id);
        const newBlogs = blogs.filter((each) => each.id !== id);
        setBlogs(newBlogs);
        dispatch(
          showNotification(
            `${blog.title} by ${blog.author} has been removed`,
            5
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h2>Blogs</h2>
      <Notification />
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
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        ></LoggedinPage>
      )}
    </div>
  );
};

export default App;
