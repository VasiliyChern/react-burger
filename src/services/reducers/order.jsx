import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  ORDER_RESET
} from '../actions/order';

const initialState = {
  orderRequest: false,
  orderFailed: false,
  order: null
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      };
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        orderFailed: false,
        orderRequest: false
      };
    }
    case ORDER_ERROR: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false
      };
    }
    case ORDER_RESET: {
      return {
        ...state,
        order: null
      };
    }
    default: {
      return state;
    }
  }
}  