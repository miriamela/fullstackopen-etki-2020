import React, { useState, useEffect } from "react";
import { LOG_IN } from "../queries";
import { useMutation } from "@apollo/client";

const LogIn = ({ setToken, show, setError, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOG_IN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
      setTimeout(() => {
        setError(null);
      }, 2000);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      console.log(token);
      localStorage.setItem("user-token", token);
      setToken(token);
      setPage("authors");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);
  if (!show) {
    return null;
  }
  const submit = async (ev) => {
    ev.preventDefault();
    console.log("click");
    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };
  return (
    <form onSubmit={submit}>
      <div>
        <label>username</label>
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};
export default LogIn;
