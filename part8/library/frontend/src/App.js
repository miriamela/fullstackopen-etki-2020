import React, { useState, useEffect } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/LogIn";
import Notify from "./components/Notify";
import { ALL_AUTHORS, ALL_BOOKS, USER } from "./queries";
import { useApolloClient } from "@apollo/client";

function App() {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const resultAuthors = useQuery(ALL_AUTHORS);
  const resultBooks = useQuery(ALL_BOOKS);
  const user = useQuery(USER);
  const client = useApolloClient();
  // console.log(resultBooks);

  useEffect(() => {
    const tokenSaved = localStorage.getItem("user-token");
    console.log(tokenSaved);
    if (tokenSaved) {
      setToken(tokenSaved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(token);

  if (resultAuthors.loading || resultBooks.loading) {
    return <h3>Loading... </h3>;
  }

  const authors = resultAuthors.data.allAuthors;
  const books = resultBooks.data.allBooks;

  const loggingOut = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div className="App">
      <nav>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("newBook")}>new book</button>
        ) : null}
        {token ? (
          <button onClick={loggingOut}>Log Out</button>
        ) : (
          <button onClick={() => setPage("logIn")}>Log in</button>
        )}
      </nav>
      <div>
        {error ? <Notify error={error} /> : null}
        <Authors authors={authors} show={page === "authors"} />
        <Books user={user} books={books} show={page === "books"} />
        <NewBook show={page === "newBook"} />
        <Login
          setPage={setPage}
          setError={setError}
          setToken={setToken}
          show={page === "logIn"}
        />
      </div>
    </div>
  );
}

export default App;
