import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addingLike } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  let anecdotes = useSelector((state) => state);
  anecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addingLike(id));
  };
  return (
    <section>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AnecdoteList;
