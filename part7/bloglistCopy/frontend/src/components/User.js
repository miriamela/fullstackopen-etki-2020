import React from "react";
import { useDispatch } from "react-redux";
import { userLogOut } from "../reducers/userReducer";
import { Button } from "react-bootstrap";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(userLogOut());
  };
  return (
    <div style={{ padding: "14px" }}>
      <p className="userLoggedIn">{user.name} logged in</p>
      <Button
        className="btn btn-primary btn-sm logout"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default User;
