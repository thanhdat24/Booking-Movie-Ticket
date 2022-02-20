import theatersApi from "../../api/theatersApi";
import {
  GET_THEATER_LIST_REQUEST,
  GET_THEATER_LIST_SUCCESS,
  GET_THEATER_LIST_FAIL,
} from "../constants/Theater";
export const getTheaterList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_THEATER_LIST_REQUEST,
      });
      const result = await theatersApi.getTheaterList();
      dispatch({
        type: GET_THEATER_LIST_SUCCESS,
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_THEATER_LIST_FAIL,
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};
