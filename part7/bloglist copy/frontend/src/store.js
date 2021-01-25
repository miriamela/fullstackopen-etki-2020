import { createStore, combineReducers, applyMiddleware } from "redux";
import notificationReducer from "./reducers/notificationsReducers";
import blogsReducer from "./reducers/blogsReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
});
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
