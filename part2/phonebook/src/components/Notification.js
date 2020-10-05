import React from "react";

function Notification({ message }) {
  if (message === null) {
    return null;
  } else {
    return <div style={message.textStyle}>{message.text}</div>;
  }
}
export default Notification;
