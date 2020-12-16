import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div id="message">{message}</div>;
};
export default Notification;
