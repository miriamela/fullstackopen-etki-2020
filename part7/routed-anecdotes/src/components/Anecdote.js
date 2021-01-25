import React from "react";
// import { useParams } from "react-router-dom";

const Anecdote = ({ anecdote, vote }) => {
  // const id = useParams().id;
  // let anecdote = anecdotes.find((a) => a.id === id);
  const handleClick = (e) => {
    e.preventDefault();
    const id = e.target.id;
    vote(id);
  };
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <button id={anecdote.id} onClick={handleClick}>
        vote
      </button>
      <p>
        For more info: <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};
export default Anecdote;
