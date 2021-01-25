import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  console.log(notification);

  if (notification === "") {
    return null;
  }
  return <div id="message">{notification}</div>;
};
export default Notification;
