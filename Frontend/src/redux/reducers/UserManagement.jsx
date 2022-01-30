import { TOKEN, USER_LOGIN } from "../../constants/config";
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from "../types/UserManagement";
const currentUser = localStorage.getItem(USER_LOGIN)
  ? JSON.parse(localStorage.getItem(USER_LOGIN))
  : null;
const stateDefault = { currentUser: currentUser, responseRegister: null };

export const UserManagement = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      console.log(action);
      const { payload } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(payload));
      localStorage.setItem(TOKEN, payload.token);
      return { ...state, currentUser: payload.data };
    }
    case REGISTER_SUCCESS: {
      console.log(action);
      return {
        ...state,
        responseRegister: action.payload.data,
      };
    }
    default:
      return { ...state };
  }
};
