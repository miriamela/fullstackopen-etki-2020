const reducer = (state = "", action) => {
  switch (action.type) {
    case "SHOW":
      const text = action.data;
      return text;
    case "HIDE":
      return "";
    default:
      return state;
  }
};

export const showNotification = (text, time) => {
  return async (dispatch) => {
    await dispatch({
      type: "SHOW",
      data: text,
    });
    setTimeout(() => {
      dispatch({
        type: "HIDE",
      });
    }, time * 1000);
  };
};

export default reducer;
