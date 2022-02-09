import usersApi from "../../api/usersApi";
import {
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



export const resetUserList = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_USER_LIST,
    });
  };
};
