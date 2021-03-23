import React, { useState } from "react";

const Books = ({ show, books }) => {
  const [selectedGenre, setSelectedGenre] = useState("allBooks");
  console.log(books);

  let genres = [];

  const totalGenres = () => {
    const genres1 = [];
    for (let i = 0; i < books.length; i++) {
      genres1.push(books[i].genres);
    }
    genres1.forEach((each) => {
      genres = [...genres, ...each];
    });
    genres = Array.from(new Set([...genres]));
  };
  totalGenres();

  console.log(genres);

  if (!show) {
    return null;
  }

  const booksByGenre = (selectedGenre) => {
    if (selectedGenre === "allBooks") {
      return books;
    } else {
      return books.filter((each) => each.genres.includes(selectedGenre));
    }
  };

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
          {booksByGenre(selectedGenre).map((each) => (
            <tr key={each.id}>
              <td>{each.title}</td>
              <td>{each.author.name}</td>
              <td>{each.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((each) => (
        <button key={each} onClick={() => setSelectedGenre(each)}>
          {each}
        </button>
      ))}
      <button onClick={() => setSelectedGenre("allBooks")}>all genres</button>
    </>
  );
};

export default Books;
