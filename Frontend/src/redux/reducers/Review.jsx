import {
  ADD_REVIEW_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  GET_REVIEW_LIST_FAIL,
  GET_REVIEW_LIST_REQUEST,
  GET_REVIEW_LIST_SUCCESS,
  LIKE_COMMENT_FAIL,
  LIKE_COMMENT_REQUESS,
  LIKE_COMMENT_SUCCESS,
} from "../constants/Review";

const stateDefault = {
  loadingCommentList: null,
  errorCommentList: null,
  commentList: null,

  postReviewObj: "",
  loadingAddReview: false,
  errorAddReview: null,

  likeCommentObj: {},
  loadingLikeComment: false,
  errorLikeComment: null,
};

export const ReviewReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_REVIEW_LIST_REQUEST: {
      return {
        ...state,
        loadingCommentList: true,
        errorCommentList: null,
        commentList: null,
      };
    }
    case GET_REVIEW_LIST_SUCCESS: {
      return {
        ...state,
        commentList: action.payload.data,
        loadingCommentList: false,
      };
    }
    case GET_REVIEW_LIST_FAIL: {
      return {
        ...state,
        errorCommentList: action.payload.error,
        loadingCommentList: false,
      };
    }

    case ADD_REVIEW_REQUEST: {
      return { ...state, loadingAddReview: true, errorAddReview: null };
    }
    case ADD_REVIEW_SUCCESS: {
      return {
        ...state,
        postReviewObj: action.payload.data,
        loadingAddReview: false,
      };
    }
    case ADD_REVIEW_FAIL: {
      return {
        ...state,
        errorAddReview: action.payload.error,
        loadingAddReview: false,
      };
    }
    case LIKE_COMMENT_REQUESS: {
      return { ...state, loadingLikeComment: true, errorLikeComment: null };
    }
    case LIKE_COMMENT_SUCCESS: {
      return {
        ...state,
        likeCommentObj: action.payload.data,
        loadingLikeComment: false,
      };
    }
    case LIKE_COMMENT_FAIL: {
      return {
        ...state,
        errorLikeComment: action.payload.error,
        loadingLikeComment: false,
      };
    }
    default:
      return { ...state };
  }
};
