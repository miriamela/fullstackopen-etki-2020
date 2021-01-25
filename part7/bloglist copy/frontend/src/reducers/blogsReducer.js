/* eslint-disable prettier/prettier */
import blogService from "../services/blog";
import { showNotification } from "./notificationsReducers";

const blogsReducer = (state = [], action) => {
  console.log(action, state);
  switch (action.type) {
    case "CREATE_BLOG":
      const newBlog = action.data;
      return [...state, newBlog];
    case "DELETE_BLOG":
      const id = action.data;
      const newBlogs = state.filter((each) => each.id !== id);
      return newBlogs;
    case "INCREASE_LIKES":
      const idLike = action.data.id;
      const changedBlog = action.data;
      return state.map((each) => (each.id !== idLike ? each : changedBlog));
    case "RETRIEVE_ALL":
      return action.data;
    default:
      return state;
  }
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newObject = await blogService.create(content);
    await dispatch({
      type: "CREATE_BLOG",
      data: newObject,
    });
    dispatch(
      showNotification(`a new blog ${newObject.title} has been added`, 5)
    );
  };
};

export default blogsReducer;
