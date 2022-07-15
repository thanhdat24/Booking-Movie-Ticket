import {
  CREATE_DISCOUNT_FAIL,
  CREATE_DISCOUNT_REQUEST,
  CREATE_DISCOUNT_SUCCESS,
  GET_DISCOUNT_LIST_FAIL,
  GET_DISCOUNT_LIST_REQUEST,
  GET_DISCOUNT_LIST_SUCCESS,
  RESET_DISCOUNT,
  UPDATE_ACTIVE_DISCOUNT_FAIL,
  UPDATE_ACTIVE_DISCOUNT_REQUEST,
  UPDATE_ACTIVE_DISCOUNT_SUCCESS,
} from "../constants/Discount";

const stateDefault = {
  discountList: [],
  loadingDiscountList: false,
  errorDiscountList: null,

  successUpdateActiveDiscount: "",
  loadingUpdateActiveDiscount: false,
  errorUpdateActiveDiscount: null,

  loadingCreateDiscount: false,
  successCreateDiscount: null,
  errorCreateDiscount: null,
};

export const DiscountReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_DISCOUNT_LIST_REQUEST: {
      return {
        ...state,
        loadingDiscountList: true,
        errorDiscountList: null,
      };
    }
    case GET_DISCOUNT_LIST_SUCCESS: {
      return {
        ...state,
        discountList: action.payload.data,
        loadingDiscountList: false,
      };
    }
    case GET_DISCOUNT_LIST_FAIL: {
      return {
        ...state,
        errorDiscountList: action.payload.error,
        loadingDiscountList: false,
      };
    }
    case UPDATE_ACTIVE_DISCOUNT_REQUEST: {
      return {
        ...state,
        loadingUpdateActiveDiscount: true,
        errorUpdateActiveDiscount: null,
        successUpdateActiveDiscount: "",
      };
    }
    case UPDATE_ACTIVE_DISCOUNT_SUCCESS: {
      return {
        ...state,
        loadingUpdateActiveDiscount: false,
        successUpdateActiveDiscount: action.payload.data,
        errorUpdateActiveDiscount: null,
      };
    }
    case UPDATE_ACTIVE_DISCOUNT_FAIL: {
      return {
        ...state,
        loadingUpdateActiveDiscount: false,
        errorUpdateActiveDiscount: action.payload.error,
        successUpdateActiveDiscount: "",
      };
    }

    case CREATE_DISCOUNT_REQUEST: {
      return {
        ...state,
        loadingCreateDiscount: true,
        errorCreateDiscount: null,
      };
    }
    case CREATE_DISCOUNT_SUCCESS: {
      return {
        ...state,
        successCreateDiscount: action.payload.data,
        loadingCreateDiscount: false,
      };
    }
    case CREATE_DISCOUNT_FAIL: {
      return {
        ...state,
        errorDeleteDiscount: action.payload.error,
        loadingDeleteDiscount: false,
      };
    }

    case RESET_DISCOUNT: {
      return {
        ...state,
        successCreateDiscount: "",
        errorCreateDiscount: null,
      };
    }
    default:
      return { ...state };
  }
};
