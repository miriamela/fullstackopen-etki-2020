import React from "react";
import { connect } from "react-redux";
import { addingLike } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  let anecdotesToShow = props.anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = (id, anecdote) => {
    props.addingLike(id, anecdotesToShow);
    props.showNotification(`you liked: "${anecdote}"`, 5);
  };

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
const mapStateToProps = (state) => {
  if (state.filter === "") {
    return {
      anecdotes: state.anecdotes,
    };
  } else {
    return {
      anecdotes: state.anecdotes.filter((anecdote) => {
        return anecdote.content.toLowerCase().includes(state.filter);
      }),
    };
  }
};
const mapDispatchToProps = {
  addingLike,
  showNotification,
};
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
