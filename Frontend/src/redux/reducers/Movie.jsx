import {
  ADD_MOVIE_FAIL,
  ADD_MOVIE_REQUEST,
  ADD_MOVIE_SUCCESS,
  DELETE_MOVIE_FAIL,
  DELETE_MOVIE_REQUEST,
  DELETE_MOVIE_SUCCESS,
  GET_MOVIE_LIST_FAIL,
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCCESS,
  RESET_MOVIE_MANAGEMENT,
} from "../constants/Movie";

const stateDefault = {
  movieList: [],
  loadingMovieList: false,
  errorMovieList: null,
  movieDetail: null,

  successDeleteMovie: "",
  loadingDeleteMovie: false,
  errorDeleteMovie: null,

  successAddMovie: "",
  loadingAddMovie: false,
  errorAddMovie: null,
};

export const MovieReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_MOVIE_LIST_REQUEST: {
      return {
        ...state,
        loadingMovieList: true,
        errorMovieList: null,
        movieDetail: null,
      };
    }
    case GET_MOVIE_LIST_SUCCESS: {
      return {
        ...state,
        movieList: action.payload.data,
        loadingMovieList: false,
      };
    }
    case GET_MOVIE_LIST_FAIL: {
      return {
        ...state,
        errorMovieList: action.payload.error,
        loadingMovieList: false,
      };
    }
    case DELETE_MOVIE_REQUEST: {
      return {
        ...state,
        loadingDeleteMovie: true,
        errorDeleteMovie: null,
        successDeleteMovie: "",
      };
    }
    case DELETE_MOVIE_SUCCESS: {
      return {
        ...state,
        loadingDeleteMovie: false,
        successDeleteMovie: action.payload.data,
        errorDeleteMovie: null,
      };
    }
    case DELETE_MOVIE_FAIL: {
      return {
        ...state,
        loadingDeleteMovie: false,
        errorDeleteMovie: action.payload.error,
        successDeleteMovie: "",
      };
    }

    case ADD_MOVIE_REQUEST: {
      return { ...state, loadingAddMovie: true, errorAddMovie: null };
    }
    case ADD_MOVIE_SUCCESS: {
      console.log("action", action);
      return {
        ...state,
        successAddMovie: action.payload.data,
        loadingAddMovie: false,
      };
    }
    case ADD_MOVIE_FAIL: {
      return {
        ...state,
        errorAddMovie: action.payload.error,
        loadingAddMovie: false,
      };
    }

    case RESET_MOVIE_MANAGEMENT: {
      return {
        ...state,
        loadingMovieList: false,
        errorMovieList: null,

        successDeleteMovie: "",
        loadingDeleteMovie: false,
        errorDeleteMovie: null,

        successUpdateMovie: "",
        loadingUpdateMovie: false,
        errorUpdateMovie: null,

        successAddMovie: "",
        loadingAddMovie: false,
        errorAddMovie: null,
      };
    }
    default:
      return { ...state };
  }
};
