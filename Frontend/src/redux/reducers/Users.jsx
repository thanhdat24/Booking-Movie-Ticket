import { TOKEN, USER_LOGIN } from "../../constants/config";
import {
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USER_LIST_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  RESET_USER_LIST,
} from "../types/Users";
const stateDefault = {
  usersList: null,
  loadingUsersList: false,
  errorUsersList: null,

  successDelete: null,
  loadingDelete: false,
  errorDelete: null,
};

export const UserManagement = (state = stateDefault, action) => {
  switch (action.type) {
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
    case DELETE_USER_REQUEST: {
      return {
        ...state,
        loadingDelete: true,
        errorDelete: null,
        successDelete: "",
      };
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        loadingDelete: false,
        successDelete: action.payload.data,
        errorDelete: null,
      };
    }
    case DELETE_USER_FAIL: {
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload.error,
        successDelete: "",
      };
    }

    case RESET_USER_LIST: {
      return {
        ...state,
        errorUsersList: null,
        successDelete: "",
        errorDelete: null,
      };
    }
    default:
      return { ...state };
  }
};
