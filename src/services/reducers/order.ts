import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  ORDER_RESET
} from '../actions/order';

interface IOrder {
  orderRequest: boolean;
  orderFailed: boolean;
  order: number;
}

const initialState: IOrder = {
  orderRequest: false,
  orderFailed: false,
  order: 0
}

export const orderReducer = (state = initialState, action: any) => {
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