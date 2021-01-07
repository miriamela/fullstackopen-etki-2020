import React, { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { initializingAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import Filter from "./components/Filter";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializingAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
