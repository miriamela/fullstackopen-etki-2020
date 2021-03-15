import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries";

const NewBook = ({ show }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [createNewBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });
  // eslint-disable-next-line no-unused-expressions
  // refetchQueries: [{ query: ALL_PERSONS }];

  if (!show) {
    return null;
  }
  const addGenres = (ev) => {
    ev.preventDefault();
    setGenres(genres.concat(genre));
    setGenre("");
  };

  const submit = (ev) => {
    ev.preventDefault();
    createNewBook({ variables: { title, author, published, genres } });
    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  return (
    <>
      <h2>New Book</h2>
      <form onSubmit={submit}>
        <div>
          <label>title</label>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>author</label>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>published</label>
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          ></input>
          <button type="submit" onClick={addGenres}>
            Add new genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">Add Book</button>
      </form>
    </>
  );
};
export default NewBook;
