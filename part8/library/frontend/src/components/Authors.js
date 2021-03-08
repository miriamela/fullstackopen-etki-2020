import React from "react";

const Authors = ({ authors, show }) => {
  if (!show) {
    return null;
  }
  return (
    <>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((each) => (
            <tr key={each.name}>
              <td>{each.name}</td>
              <td>{each.born}</td>
              <td>{each.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Authors;
