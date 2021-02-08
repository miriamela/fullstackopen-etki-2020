import React from "react";
import { Link } from "react-router-dom";
import User from "./User";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  return (
    <nav>
      <Link to="/">blogs</Link> {""}
      <Link to="/users/">users</Link>
      <User user={user} />
    </nav>
  );
};

export default NavBar;
