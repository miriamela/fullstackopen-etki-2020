import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { RECOMMENDED_BOOKS, USER } from "../queries";

const Recommended = ({ show}) => {
  const [userGenre, setUserGenre]=useState(null)
  const user=useQuery(USER)
  const [setBooks, {data}] =useLazyQuery(RECOMMENDED_BOOKS)
  console.log(user)
  
  useEffect(() => {
    if(!user.loading && user.data.me !== null){
      setUserGenre(user.data.me.favoriteGenre)
    }
    setBooks({variables:{genre: userGenre}})
  }, [user, userGenre, setBooks])
 
// console.log(data)
  
  if (!show || !data){
    return null
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
