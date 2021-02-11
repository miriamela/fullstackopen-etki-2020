import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const IndividualUser = () => {
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  const user = users.find((each) => each.id === id);
  console.log(users, user);
  if (!user) {
    return null;
  }
  return (
    <div className="container">
      <h3>{user.name}</h3>
      <h5>added blogs:</h5>
      <ul className="list-group">
        {user.blogs.map((each) => (
          <li class="list-group-item" key={each.id}>
            <Link to={`/blogs/${each.id}`}>{each.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndividualUser;
