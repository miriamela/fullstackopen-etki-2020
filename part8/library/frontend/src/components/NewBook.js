import React, { useState } from "react";

const NewBook = ({ show }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  if (!show) {
    return null;
  }
  const addGenres = (ev) => {
    ev.preventDefault();
    setGenres(genres.concat(genre));
    setGenre("");
  };

  const submit = (event) => {
    event.preventDefault();

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
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.genre)}
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
