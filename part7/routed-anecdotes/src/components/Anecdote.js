import React from "react";
// import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes, anecdote }) => {
  // const id = useParams().id;
  // let anecdote = anecdotes.find((a) => a.id === id);
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has 0 votes</p>
    </div>
  );
};
export default Anecdote;
