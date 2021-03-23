import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { RECOMMENDED_BOOKS, USER } from "../queries";

const Recommended = ({ show }) => {
  const [userGenre, setUserGenre] = useState("");
  const [recommended, { data }] = useLazyQuery(RECOMMENDED_BOOKS);
  const user = useQuery(USER);

  useEffect(() => {
    if (user.loading) {
      return <h3>loading</h3>;
    }
    if (!user.loading) {
      setUserGenre(user.data.me.favoriteGenre);
      recommended({ variables: { genre: userGenre } });
    }
  }, [user, userGenre, recommended]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite <b>genre patterns:</b>
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {data.allBooks.map((each) => (
            <tr key={each.id}>
              <td>{each.title}</td>
              <td>{each.author.name}</td>
              <td>{each.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Recommended;
