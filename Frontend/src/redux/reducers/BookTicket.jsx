import {
  CREATE_SHOWTIME_FAIL,
  CREATE_SHOWTIME_REQUEST,
  CREATE_SHOWTIME_SUCCESS,
  DELETE_SHOWTIME_FAIL,
  DELETE_SHOWTIME_REQUEST,
  DELETE_SHOWTIME_SUCCESS,
  RESET_CREATE_SHOWTIME,
} from "../constants/BookTicket";

const stateDefault = {
  loadingCreateShowtime: false,
  successCreateShowtime: null,
  errorCreateShowtime: null,

  loadingDeleteShowtime: false,
  successDeleteShowtime: null,
  errorDeleteShowtime: null,
};

export const BookTicketReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case CREATE_SHOWTIME_REQUEST: {
      return {
        ...state,
        loadingCreateShowtime: true,
        errorCreateShowtime: null,
      };
    }
    case CREATE_SHOWTIME_SUCCESS: {
      return {
        ...state,
        successCreateShowtime: action.payload.data,
        loadingCreateShowtime: false,
      };
    }
    case CREATE_SHOWTIME_FAIL: {
      return {
        ...state,
        errorDeleteShowtime: action.payload.error,
        loadingDeleteShowtime: false,
      };
    }
    case DELETE_SHOWTIME_REQUEST: {
      return {
        ...state,
        loadingDeleteShowtime: true,
        errorDeleteShowtime: null,
      };
    }
    case DELETE_SHOWTIME_SUCCESS: {
      return {
        ...state,
        successDeleteShowtime: action.payload.data,
        loadingDeleteShowtime: false,
      };
    }
    case DELETE_SHOWTIME_FAIL: {
      return {
        ...state,
        errorDeleteShowtime: action.payload.error,
        loadingDeleteShowtime: false,
      };
    }

    case RESET_CREATE_SHOWTIME: {
      state.loadingCreateShowtime = false;
      state.successCreateShowtime = null;
      state.errorCreateShowtime = null;

      state.loadingDeleteShowtime = false;
      state.successDeleteShowtime = null;
      state.errorDeleteShowtime = null;
      return state;
    }
    default:
      return { ...state };
  }
};
