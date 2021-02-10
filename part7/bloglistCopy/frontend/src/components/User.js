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
    <>
      <h6 className="userLoggedIn">{user.name} logged in</h6>
      <Button
        className="btn btn-primary btn-sm logout"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
};

export default User;
