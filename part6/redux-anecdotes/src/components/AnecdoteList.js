import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addingLike } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import { hideNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  let anecdotes = useSelector((state) => state.anecdotes);
  let filter = useSelector((state) => state.filter);
  let anecdotesToShow;
  if (filter === "") {
    anecdotesToShow = anecdotes;
  } else {
    let filteredAnecdotes = anecdotes.filter((anecdote) => {
      return anecdote.content.toLowerCase().includes(filter);
    });
    anecdotesToShow = filteredAnecdotes;
  }

  console.log(anecdotesToShow);
  anecdotesToShow = anecdotesToShow.sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const vote = (id, anecdote) => {
    dispatch(addingLike(id));
    dispatch(showNotification(`you liked: "${anecdote}"`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };
  console.log(anecdotesToShow);

  return (
    <section>
      {anecdotesToShow.map((each) => (
        <div key={each.id}>
          <div>{each.content}</div>
          <div>
            has {each.votes}
            <button onClick={() => vote(each.id, each.content)}>vote</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AnecdoteList;
