import usersApi from "../../api/usersApi";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_ERROR_LOGIN_REGISTER,
  RESET_UPDATE,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../types/Auth";

export const login = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });
      const result = await usersApi.postLogin(user);
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

export const updateCurrentUser = (currentUser) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    usersApi
      .updateCurrentUser(currentUser)
      .then((result) => {
        console.log("result", result);
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: {
            status: result.data.status,
            data: result.data,
            token: result.data.token,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_USER_FAIL,
          payload: {
            error: error,
          },
        });
      });
  };
};

export const resetUpdate = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_UPDATE,
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
