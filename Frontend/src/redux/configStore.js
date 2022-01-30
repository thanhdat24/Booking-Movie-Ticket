import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { UserManagement } from "./reducers/UserManagement";
const rootReducer = combineReducers({
  UserManagement,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
