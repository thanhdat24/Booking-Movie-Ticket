import usersApi from "../../api/usersApi";
import {
  GET_USER_LIST_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_ERROR_LOGIN_REGISTER,
  RESET_USER_LIST,
} from "../types/UserManagement";
export const login = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });
      const result = await usersApi.postLogin(user);
      console.log("result", result);
      dispatch({
        type: LOGIN_SUCCESS,
        data: result.data,
        token: result.data.token,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const register = (user) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    usersApi
      .postRegister(user)
      .then((result) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_FAIL,
          payload: {
            error: error.response?.data.message,
          },
        });
      });
  };
};

export const getUsersList = () => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_LIST_REQUEST,
    });
    usersApi
      .getUsersList()
      .then((result) => {
        dispatch({
          type: GET_USER_LIST_SUCCESS,
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_LIST_FAIL,
          payload: {
            error: error,
          },
        });
      });
  };
};
export const resetErrorLoginRegister = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_ERROR_LOGIN_REGISTER,
    });
  };
};


export const resetUserList = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_USER_LIST,
    });
  };
};