import { GET_THEATER_CLUSTER_FAIL, GET_THEATER_CLUSTER_LIST_FAIL, GET_THEATER_CLUSTER_LIST_REQUEST, GET_THEATER_CLUSTER_LIST_SUCCESS, GET_THEATER_CLUSTER_REQUEST, GET_THEATER_CLUSTER_SUCCESS } from "../constants/TheaterCluster";

const stateDefault = {
  theaterClusterList: [],
  loadingTheaterClusterList: false,
  errorTheaterClusterList: null,

  successDetailTheaterCluster: "",
  loadingDetailTheaterCluster: false,
  errorDetailTheaterCluster: null,
};

export const TheaterClusterReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_THEATER_CLUSTER_LIST_REQUEST: {
      return {
        ...state,
        loadingTheaterClusterList: true,
        errorTheaterClusterList: null,
        theaterClusterList: null,
      };
    }
    case GET_THEATER_CLUSTER_LIST_SUCCESS: {
      return {
        ...state,
        theaterClusterList: action.payload.data,
        loadingTheaterClusterList: false,
      };
    }
    case GET_THEATER_CLUSTER_LIST_FAIL: {
      return {
        ...state,
        errorTheaterClusterList: action.payload.error,
        loadingTheaterClusterList: false,
      };
    }

    case GET_THEATER_CLUSTER_REQUEST: {
      return {
        ...state,
        loadingDetailTheaterCluster: true,
        errorDetailTheaterCluster: null,
        successDetailTheaterCluster: "",
      };
    }
    case GET_THEATER_CLUSTER_SUCCESS: {
      return {
        ...state,
        loadingDetailTheaterCluster: false,
        successDetailTheaterCluster: action.payload.data,
        errorDetailTheaterCluster: null,
      };
    }
    case GET_THEATER_CLUSTER_FAIL: {
      return {
        ...state,
        loadingDetailTheaterCluster: false,
        errorDetailTheaterCluster: action.payload.error,
        successDetailTheaterCluster: "",
      };
    }
    default:
      return { ...state };
  }
};
