import React from "react";
import { useDispatch } from "react-redux";
import { userLogOut } from "../reducers/userReducer";

const User = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(userLogOut());
  };
  return (
    <>
      <h4 className="userLoggedIn">{user.name} logged in</h4>
      <button className="logout" type="button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default User;
