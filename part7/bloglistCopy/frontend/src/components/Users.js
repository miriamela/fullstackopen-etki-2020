import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/allUsersReducer";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);
  console.log(users);

  return (
    <>
      <h2>Users</h2>
      <Table striped bordered hover size="sm">
        <tbody>
          <tr>
            <th></th>
            <th>
              <h5>blogs created</h5>
            </th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} style={{ width: "50%" }}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
