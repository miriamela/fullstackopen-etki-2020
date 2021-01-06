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

export const hideNotification = () => {
  return {
    type: "HIDE",
  };
};
export const showNotification = (text) => {
  return {
    type: "SHOW",
    data: text,
  };
};
export default reducer;
