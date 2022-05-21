import {
  CREATE_SHOWTIME_FAIL,
  CREATE_SHOWTIME_REQUEST,
  CREATE_SHOWTIME_SUCCESS,
  DELETE_SHOWTIME_FAIL,
  DELETE_SHOWTIME_REQUEST,
  DELETE_SHOWTIME_SUCCESS,
  GET_SHOWTIME_FAIL,
  GET_SHOWTIME_REQUEST,
  GET_SHOWTIME_SUCCESS,
  RESET_CREATE_SHOWTIME,
  UPDATE_SHOWTIME_FAIL,
  UPDATE_SHOWTIME_REQUEST,
  UPDATE_SHOWTIME_SUCCESS,
} from "../constants/BookTicket";

const stateDefault = {
  loadingCreateShowtime: false,
  successCreateShowtime: null,
  errorCreateShowtime: null,

  loadingDeleteShowtime: false,
  successDeleteShowtime: null,
  errorDeleteShowtime: null,

  successDetailShowtime: "",
  loadingDetailShowtime: false,
  errorDetailShowtime: null,

  successUpdateShowtime: "",
  loadingUpdateShowtime: false,
  errorUpdateShowtime: null,
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
    case GET_SHOWTIME_REQUEST: {
      return {
        ...state,
        loadingDetailShowtime: true,
        errorDetailShowtime: null,
        successDetailShowtime: "",
      };
    }
    case GET_SHOWTIME_SUCCESS: {
      return {
        ...state,
        loadingDetailShowtime: false,
        successDetailShowtime: action.payload.data,
        errorDetailShowtime: null,
      };
    }
    case GET_SHOWTIME_FAIL: {
      return {
        ...state,
        loadingDetailShowtime: false,
        errorDetailShowtime: action.payload.error,
        successDetailShowtime: "",
      };
    }
    case UPDATE_SHOWTIME_REQUEST: {
      return {
        ...state,
        loadingUpdateShowtime: true,
        errorUpdateShowtime: null,
        successUpdateShowtime: "",
      };
    }
    case UPDATE_SHOWTIME_SUCCESS: {
      return {
        ...state,
        loadingUpdateShowtime: false,
        successUpdateShowtime: action.payload.data,
        errorUpdateShowtime: null,
      };
    }
    case UPDATE_SHOWTIME_FAIL: {
      return {
        ...state,
        loadingUpdateShowtime: false,
        errorUpdateShowtime: action.payload.error,
        successUpdateShowtime: "",
      };
    }

    case RESET_CREATE_SHOWTIME: {
      state.loadingCreateShowtime = false;
      state.successCreateShowtime = null;
      state.errorCreateShowtime = null;

      state.loadingDeleteShowtime = false;
      state.successDeleteShowtime = null;
      state.errorDeleteShowtime = null;

      state.successUpdateShowtime = null;
      state.loadingUpdateShowtime = false;
      state.errorUpdateShowtimee = null;
      
      return state;
    }
    default:
      return { ...state };
  }
};
