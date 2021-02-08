import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IndividualUser = () => {
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  const user = users.find((each) => each.id === id);
  console.log(users, user);
  if (!user) {
    return null;
  }
  return (
    <>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      {user.blogs.map((each) => (
        <ul key={each.id}>
          <li>{each.title}</li>
        </ul>
      ))}
    </>
  );
};

export default IndividualUser;
