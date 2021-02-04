/* eslint-disable prettier/prettier */
import React from "react";
import PropTypes from "prop-types";
import { userLogIn } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

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
    <form className="form" onSubmit={handleLogin} method="post" action="">
      <label htmlFor="username">
        Username
        <input type="text" id="username" name="username"></input>
      </label>
      <label htmlFor="password">
        Password
        <input type="password" id="password" name="password"></input>
      </label>
      {/* since the function to handle the submit in on form, no need to add the onClick for the button!! */}
      <button id="loginButton" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;

// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   handleUsername: PropTypes.func.isRequired,
//   password: PropTypes.string.isRequired,
//   handlePassword: PropTypes.func.isRequired,
// };
