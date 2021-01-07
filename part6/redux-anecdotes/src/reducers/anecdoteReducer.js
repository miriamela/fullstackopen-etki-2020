import anecdotesService from "../services/anecdotes";

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "INCREASING_LIKE":
      const id = action.data.id;
      const changedAnecdote = action.data;
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

export const initializingAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};
export const addingLike = (id, anecdotes) => {
  return async (dispatch) => {
    const anecdoteToChange = anecdotes.find((each) => each.id === id);
    console.log(anecdoteToChange);
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };
    console.log(changedAnecdote);

    const updatedAnecdote = await anecdotesService.increaseLike(
      id,
      changedAnecdote
    );
    dispatch({
      type: "INCREASING_LIKE",
      data: updatedAnecdote,
    });
  };
};

export const addingAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.addNewAnecdote(content);
    dispatch({
      type: "CREATE_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export default reducer;
