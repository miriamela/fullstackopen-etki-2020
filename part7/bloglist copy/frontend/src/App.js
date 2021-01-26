/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from "react";
import blogService from "./services/blog";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoggedinPage from "./components/LoggedinPage";
import "./App.css";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  // fetching all blogs
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

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
        ></LoggedinPage>
      )}
    </div>
  );
};

export default App;
