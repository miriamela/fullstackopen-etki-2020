import React from "react";

const Books = ({ show, books }) => {
  console.log(books);
  if (!show) {
    return null;
  }
  return (
    <>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>publisher</th>
          </tr>
          {books.map((each) => (
            <tr key={each.title}>
              <td>{each.title}</td>
              <td>{each.author.name}</td>
              <td>{each.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Books;
