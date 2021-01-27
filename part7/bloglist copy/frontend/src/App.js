/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoggedinPage from "./components/LoggedinPage";
import "./App.css";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { useSelector } from "react-redux";
const App = () => {
  const user = useSelector((state) => state.user);

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
      dispatch({
        type: "LOGGED_IN",
        data: user,
      });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <h2>Blogs</h2>
      <Notification />
      {user === null ? (
        <LoginForm></LoginForm>
      ) : (
        <LoggedinPage user={user} blogFormRef={blogFormRef}></LoggedinPage>
      )}
    </div>
  );
};

export default App;
