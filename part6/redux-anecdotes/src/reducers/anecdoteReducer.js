const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "INCREASING_LIKE":
      const id = action.data.id;
      const anecdoteToChange = state.find((each) => each.id === id);
      console.log(anecdoteToChange);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      console.log(changedAnecdote);
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    case "CREATE_ANECDOTE":
      return [...state, action.data];

    case "INIT_ANECDOTES":
      return action.data;

    default:
      return state;
  }
};

export const initializingAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  };
};

export const addingLike = (id) => {
  return {
    type: "INCREASING_LIKE",
    data: { id },
  };
};

export const addingAnecdote = (anecdote) => {
  return {
    type: "CREATE_ANECDOTE",
    data: {
      content: anecdote,
      votes: 0,
    },
  };
};

export default reducer;
