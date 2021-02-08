import usersService from "../services/users";
const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case "GET-ALL":
      return action.data;
    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch({
      type: "GET-ALL",
      data: users,
    });
  };
};

export default allUsersReducer;
