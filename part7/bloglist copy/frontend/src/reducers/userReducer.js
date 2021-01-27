import loginService from "../services/login";
import { showNotification } from "./notificationsReducers";

const userReducer = (state = null, action) => {
  console.log(state, action);
  switch (action.type) {
    case "LOGGED_IN":
      const user = action.data;
      return user;
    case "LOGGED_OUT":
      return null;
    default:
      return state;
  }
};

export const userLogIn = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      dispatch({
        type: "LOGGED_IN",
        data: user,
      });
    } catch (error) {
      dispatch(showNotification("Wrong Credentials", 5));
    }
  };
};

export const userLogOut = () => {
  return async (dispatch) => {
    await window.localStorage.removeItem("loggedBlogUser");
    dispatch({
      type: "LOGGED_OUT",
      // data: null,
    });
  };
};

export default userReducer;
