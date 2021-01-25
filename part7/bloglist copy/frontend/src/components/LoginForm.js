import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  username,
  handleUsername,
  password,
  handlePassword,
}) => {
  return (
    <form className="form" onSubmit={handleLogin} method="post" action="">
      <label htmlFor="username">
        Username
        <input
          type="text"
          value={username}
          id="username"
          name="username"
          onChange={handleUsername}
        ></input>
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          value={password}
          id="password"
          name="password"
          onChange={handlePassword}
        ></input>
      </label>
      {/* since the function to handle the submit in on form, no need to add the onClick for the button!! */}
      <button id="loginButton" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePassword: PropTypes.func.isRequired,
};
