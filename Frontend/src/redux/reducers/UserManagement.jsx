import { TOKEN, USER_LOGIN } from "../../constants/config";
import {
  GET_USER_LIST_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REQUIRED,
  RESET_USER_LIST,
} from "../types/UserManagement";
const currentUser = localStorage.getItem(USER_LOGIN)
  ? JSON.parse(localStorage.getItem(USER_LOGIN))
  : null;
const stateDefault = {
  currentUser: currentUser,
  loadingLogin: false,
  errorLogin: null,

  responseRegister: null,
  loadingRegister: false,
  errorRegister: null,

  usersList: null,
  loadingUsersList: false,
  errorUsersList: null,
};

export const UserManagement = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loadingLogin: true, errorLogin: null }; // error: null trong trường error đang báo lỗi, nhấn đăng nhập lại thì cần reset lại không báo lỗi nữa
    }
    case LOGIN_SUCCESS: {
      console.log(action);
      const { data, token } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(data, token));
      localStorage.setItem(TOKEN, token);
      return { ...state, currentUser: data, loadingLogin: false };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        errorLogin: action.payload.error,
        loadingLogin: false,
      };
    }
    case LOGOUT: {
      localStorage.removeItem(USER_LOGIN);
      return {
        ...state,
        currentUser: null,
        responseRegister: null,
      };
    }
    case REGISTER_REQUEST: {
      return { ...state, loadingRegister: true, errorRegister: null };
    }
    case REGISTER_SUCCESS: {
      console.log(action);
      return {
        ...state,
        responseRegister: action.payload.data,
        loadingRegister: false,
      };
    }
    case REGISTER_FAIL: {
      return {
        ...state,
        errorRegister: action.payload.error,
        loadingRegister: false,
      };
    }
    case GET_USER_LIST_REQUEST: {
      return { ...state, loadingUsersList: true, errorUsersList: null };
    }
    case GET_USER_LIST_SUCCESS: {
      return {
        ...state,
        usersList: action.payload.data,
        loadingUsersList: false,
      };
    }
    case GET_USER_LIST_FAIL: {
      return {
        ...state,
        errorUsersList: action.payload.error,
        loadingUsersList: false,
      };
    }
    case RESET_USER_LIST: {
      return {
        ...state,
        errorUsersList: null,
      }
    }
    default:
      return { ...state };
  }
};
