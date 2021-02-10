/* eslint-disable prettier/prettier */
import React from "react";
import { userLogIn } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch();
  const handleLogin = (event) => {
    event.preventDefault();
    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    dispatch(userLogIn(credentials));
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin} method="post" action="">
        <h2>Log In</h2>
        <Form.Label htmlFor="username">
          Username
          <Form.Control
            type="text"
            id="username"
            name="username"
          ></Form.Control>
        </Form.Label>
        <Form.Label htmlFor="password">
          Password
          <Form.Control
            type="password"
            id="password"
            name="password"
          ></Form.Control>
        </Form.Label>
        {/* since the function to handle the submit in on form, no need to add the onClick for the button!! */}
        <Button variant="primary" id="loginButton" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
