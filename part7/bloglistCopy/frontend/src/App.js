/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoggedinPage from "./components/LoggedinPage";
import "./App.css";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import User from "./components/User";
import Users from "./components/Users";
import IndividualUser from "./components/IndividualUser";
import SingleBlog from "./components/SingleBlog";
import NavBar from "./components/NavBar";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
    <Router>
      <div className="App">
        <Notification />
        {user === null ? (
          <LoginForm />
        ) : (
          <>
            <NavBar />
            <Switch>
              <Route path="/blogs/:id">
                <SingleBlog />
              </Route>
              <Route path="/users/:id">
                <IndividualUser />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <LoggedinPage blogFormRef={blogFormRef} />
              </Route>
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
