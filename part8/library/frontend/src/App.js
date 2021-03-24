import React, { useState, useEffect } from "react";
import "./App.css";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/LogIn";
import Notify from "./components/Notify";
import Recommended from "./components/Recommended";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";

function App() {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const resultAuthors = useQuery(ALL_AUTHORS);
  const resultBooks = useQuery(ALL_BOOKS);

  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((book) => book.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  useEffect(() => {
    const tokenSaved = localStorage.getItem("user-token");
    if (tokenSaved) {
      setToken(tokenSaved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        {token ? (
          <button onClick={() => setPage("newBook")}>New Book</button>
        ) : null}
        {token ? (
          <button onClick={() => setPage("recommended")}>Recommended</button>
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
        <Books books={books} show={page === "books"} />
        <NewBook show={page === "newBook"} />
        <Recommended show={page === "recommended"} />
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
