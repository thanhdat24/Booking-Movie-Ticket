import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/Auth";
import { UserManagement } from "./reducers/Users";
const rootReducer = combineReducers({
  UserManagement,
  AuthReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
