import usersApi from "../../api/usersApi";
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
} from "../types/Users";

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
export const deleteUser = (_id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_USER_REQUEST,
    });
    usersApi
      .deleteUser(_id)
      .then((result) => {
        dispatch({
          type: DELETE_USER_SUCCESS,
          payload: {
            data: result.data.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: DELETE_USER_FAIL,
          payload: {
            error: error,
          },
        });
      });
  };
};

export const changePassword = (currentUser) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
    });
    usersApi
      .changePassword(currentUser)
      .then((result) => {
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: {
            status: result.data.status,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: CHANGE_PASSWORD_FAIL,
          payload: {
            error: error?.response.data.message,
          },
        });
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
