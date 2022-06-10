import reviewApi from "../../api/reviewApi";
import {
  GET_REVIEW_LIST_REQUEST,
  GET_REVIEW_LIST_SUCCESS,
  GET_REVIEW_LIST_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
} from "../constants/Review";

export const getAllReviews = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_REVIEW_LIST_REQUEST,
      });
      const result = await reviewApi.getAllReview();
      dispatch({
        type: GET_REVIEW_LIST_SUCCESS,
        payload: {
          data: result.data.data,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_REVIEW_LIST_FAIL,
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const addReview = (review) => {
  return (dispatch) => {
    dispatch({
      type: ADD_REVIEW_REQUEST,
    });
    reviewApi
      .postReview(review)
      .then((result) => {
        dispatch({
          type: ADD_REVIEW_SUCCESS,
          payload: {
            data: result.data.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: ADD_REVIEW_FAIL,
          payload: {
            error: error.response?.data.message,
          },
        });
      });
  };
};


