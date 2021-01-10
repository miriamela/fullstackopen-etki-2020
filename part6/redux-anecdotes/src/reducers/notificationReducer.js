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
let timeoutID;
export const showNotification = (text, time) => {
  return async (dispatch) => {
    if (timeoutID) {
      window.clearTimeout(timeoutID);
    }
    await dispatch({
      type: "SHOW",
      data: text,
    });
    timeoutID = setTimeout(() => {
      dispatch({
        type: "HIDE",
      });
    }, time * 1000);
  };
};

export default reducer;
