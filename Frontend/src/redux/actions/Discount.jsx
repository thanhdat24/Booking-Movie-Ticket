import discountsApi from "../../api/discountApi";
import {
  GET_DISCOUNT_FAIL,
  GET_DISCOUNT_LIST_FAIL,
  GET_DISCOUNT_LIST_REQUEST,
  GET_DISCOUNT_LIST_SUCCESS,
  GET_DISCOUNT_REQUEST,
  GET_DISCOUNT_SUCCESS,
  UPDATE_ACTIVE_DISCOUNT_FAIL,
  UPDATE_ACTIVE_DISCOUNT_REQUEST,
  UPDATE_ACTIVE_DISCOUNT_SUCCESS,
} from "../constants/Discount";
export const getDiscountsList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_DISCOUNT_LIST_REQUEST,
      });
      const result = await discountsApi.getDiscountsList();
      dispatch({
        type: GET_DISCOUNT_LIST_SUCCESS,
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_DISCOUNT_LIST_FAIL,
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getDetailDiscount = (_id) => {
  return (dispatch) => {
    dispatch({
      type: GET_DISCOUNT_REQUEST,
    });
    discountsApi
      .getDetailDiscount(_id)
      .then((result) => {
        dispatch({
          type: GET_DISCOUNT_SUCCESS,
          payload: {
            data: result.data.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_DISCOUNT_FAIL,
          payload: {
            error: error.response?.data.message,
          },
        });
      });
  };
};


export const updateActiveDiscount = (active, _id) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ACTIVE_DISCOUNT_REQUEST,
    });
    discountsApi
      .updateActiveDiscount(active, _id)
      .then((result) => {
        dispatch({
          type: UPDATE_ACTIVE_DISCOUNT_SUCCESS,
          payload: {
            data: result.data.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_ACTIVE_DISCOUNT_FAIL,
          payload: {
            error: error.response?.data.message,
          },
        });
      });
  };
};