import theatersClusterApi from "../../api/theatersClusterApi";
import {
  GET_THEATER_CLUSTER_FAIL,
  GET_THEATER_CLUSTER_LIST_FAIL,
  GET_THEATER_CLUSTER_LIST_REQUEST,
  GET_THEATER_CLUSTER_LIST_SUCCESS,
  GET_THEATER_CLUSTER_REQUEST,
  GET_THEATER_CLUSTER_SUCCESS,
} from "../constants/TheaterCluster";

export const getTheaterClusterList = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_THEATER_CLUSTER_LIST_REQUEST,
      });
      const result = await theatersClusterApi.getTheaterClusterList();
      console.log("result123", result);
      dispatch({
        type: GET_THEATER_CLUSTER_LIST_SUCCESS,
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_THEATER_CLUSTER_LIST_FAIL,
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getDetailTheaterCluster = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_THEATER_CLUSTER_REQUEST,
      });
      const result = await theatersClusterApi.getDetailTheaterCluster(_id);
      dispatch({
        type: GET_THEATER_CLUSTER_SUCCESS,
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_THEATER_CLUSTER_FAIL,
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

