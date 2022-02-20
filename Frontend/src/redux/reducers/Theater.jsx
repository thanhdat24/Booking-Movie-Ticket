import {
  GET_THEATER_LIST_FAIL,
  GET_THEATER_LIST_REQUEST,
  GET_THEATER_LIST_SUCCESS,
} from "../constants/Theater";

const stateDefault = {
  theaterList: [],
  loadingTheaterList: false,
  errorTheaterList: null,
  theaterDetail: null,
};

export const TheaterReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_THEATER_LIST_REQUEST: {
      return {
        ...state,
        loadingTheaterList: true,
        errorTheaterList: null,
        theaterList: null,
      };
    }
    case GET_THEATER_LIST_SUCCESS: {
      return {
        ...state,
        theaterList: action.payload.data,
        loadingTheaterList: false,
      };
    }
    case GET_THEATER_LIST_FAIL: {
      return {
        ...state,
        errorTheaterList: action.payload.error,
        loadingTheaterList: false,
      };
    }
    default:
      return { ...state };
  }
};
