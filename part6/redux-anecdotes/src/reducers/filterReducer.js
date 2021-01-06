const reducer = (state = "", action) => {
  switch (action.type) {
    case "NEW_FILTER":
      return action.data.toLowerCase();
    default:
      return state;
  }
};

export const setFilter = (input) => {
  return {
    type: "NEW_FILTER",
    data: input,
  };
};

export default reducer;
