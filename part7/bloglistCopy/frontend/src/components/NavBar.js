import React from "react";
import { Link } from "react-router-dom";
import User from "./User";
import { useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const padding = {
    padding: "20px",
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link style={padding} to="/">
            blogs
          </Link>{" "}
          {""}
          <Link style={padding} to="/users/">
            users
          </Link>
          <User user={user} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
