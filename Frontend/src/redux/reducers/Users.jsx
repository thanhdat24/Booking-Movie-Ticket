import { TOKEN, USER_LOGIN } from "../../constants/config";
import {
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USER_LIST_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  RESET_USER_LIST,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../types/Users";
const stateDefault = {
  usersList: null,
  loadingUsersList: false,
  errorUsersList: null,

  successDelete: null,
  loadingDelete: false,
  errorDelete: null,

  successChangePassword: null,
  loadingChangePassword: false,
  errorChangePassword: null,

  successUpdateUser: null,
  loadingUpdateUser: false,
  errorUpdateUser: null,
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

    case CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        loadingChangePassword: true,
        errorChangePassword: null,
        successChangePassword: "",
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loadingChangePassword: false,
        successChangePassword: action.payload.status,
        errorChangePassword: null,
      };
    }
    case CHANGE_PASSWORD_FAIL: {
      return {
        ...state,
        loadingChangePassword: false,
        errorChangePassword: action.payload.error,
        successChangePassword: "",
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        loadingUpdateUser: true,
        errorUpdateUser: null,
        successUpdateUser: null,
      };
    }
    case UPDATE_USER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        loadingUpdateUser: false,
        errorUpdateUser: null,
        successUpdateUser: data,
      };
    }
    case UPDATE_USER_FAIL: {
      return {
        ...state,
        loadingUpdateUser: false,
        errorUpdateUser: action.payload.error,
        successUpdateUser: null,
      };
    }

    case RESET_USER_LIST: {
      return {
        ...state,
        errorUsersList: null,
        successDelete: "",
        errorDelete: null,

        errorChangePassword: null,
        successChangePassword: "",

        errorUpdateUser: null,
        successUpdateUser: "",

      };
    }
    default:
      return { ...state };
  }
};
