import usersApi from "../../api/usersApi";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../types/UserManagement";
export const login = (user) => {
  return async (dispatch) => {
    try {
      //   dispatch({
      //     type: LOGIN_REQUEST,
      //   });
      const result = await usersApi.postLogin(user);
      console.log("result", result);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          data: result.data,
          token: result.data.token,
        },
      });
    } catch (error) {
      // dispatch({
      //   type: LOGIN_FAIL,
      //   payload: {
      //     error: error.response?.data.message,
      //   },
      // });
      console.log("error.response?.data", error.response?.data.message);
    }
  };
};

export const register = (user) => {
  return (dispatch) => {
    // dispatch({
    //   type: REGISTER_REQUEST,
    // });
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
            error: error.response?.data ? error.response.data : error.message,
          },
        });
        // console.log("erro error.messager", error.message);

        // console.log("error.response?.data", error.response?.data);
        // console.log(
        //   "error.response?.data.message",
        //   error.response?.data.message
        // );
      });
  };
};
