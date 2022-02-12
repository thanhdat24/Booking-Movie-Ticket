import usersApi from "../../api/usersApi";
import {
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_ERROR_LOGIN_REGISTER,
  RESET_UPDATE,
  UPDATE_USER_CURRENT_FAIL,
  UPDATE_USER_CURRENT_REQUEST,
  UPDATE_USER_CURRENT_SUCCESS,
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
      type: UPDATE_USER_CURRENT_REQUEST,
    });
    usersApi
      .updateCurrentUser(currentUser)
      .then((result) => {
        dispatch({
          type: UPDATE_USER_CURRENT_SUCCESS,
          payload: {
            status: result.data.status,
            data: result.data,
            token: result.data.token,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_USER_CURRENT_FAIL,
          payload: {
            error: error.response?.data.message,
          },
        });
      });
  };
};

export const getDetailUser = (_id) => {
  return (dispatch) => {
    usersApi
      .getDetailUser(_id)
      .then((result) => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: {
            data: result.data.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_FAIL,
          payload: {
            error: error?.response.data.message,
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
