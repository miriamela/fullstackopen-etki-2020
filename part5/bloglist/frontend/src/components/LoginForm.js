import React from "react";

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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
