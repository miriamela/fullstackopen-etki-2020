import React from "react";

const Notifications = ({ notification }) => {
  if (notification === "") {
    return null;
  }
  return <p>{notification}</p>;
};

export default Notifications;
