import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/Auth";
import { UserManagement } from "./reducers/Users";
import { MovieReducer } from "./reducers/Movie";

const rootReducer = combineReducers({
  UserManagement,
  AuthReducer,
  MovieReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
