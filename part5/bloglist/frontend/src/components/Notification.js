import React from "react";

const Notification = ({ message }) => {
  console.log(message);
  if (message === null) {
    return null;
  }
  return <div>{message}</div>;
};
export default Notification;
