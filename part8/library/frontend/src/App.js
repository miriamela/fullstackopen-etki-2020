import React, { useState } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

function App() {
  const [page, setPage] = useState("authors");
  const resultAuthors = useQuery(ALL_AUTHORS);
  const resultBooks = useQuery(ALL_BOOKS);
  console.log(resultBooks);
  if (resultAuthors.loading || resultBooks.loading) {
    return <h3>Loading... </h3>;
  }

  const authors = resultAuthors.data.allAuthors;
  const books = resultBooks.data.allBooks;

  return (
    <div className="App">
      <nav>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("newBook")}>new book</button>
      </nav>
      <div>
        <Authors authors={authors} show={page === "authors"} />
        <Books books={books} show={page === "books"} />
        <NewBook show={page === "newBook"} />
      </div>
    </div>
  );
}

export default App;
