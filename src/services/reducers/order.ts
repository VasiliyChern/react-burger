import type { TOrderActions } from '../actions/order';
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  ORDER_RESET,
  ORDER_INFO_REQUEST,
  ORDER_INFO_SUCCESS,
  ORDER_INFO_ERROR,
  ORDER_INFO_RESET
} from '../constants/order';
import { TwsOrderType } from '../types/types-burger';

interface IOrder {
  orderRequest: boolean;
  orderFailed: boolean;
  order: number | null;
  orderInfoRequest: boolean;
  orderInfoFailed: boolean;
  orderInformation: TwsOrderType | null;
}

const initialState: IOrder = {
  orderRequest: false,
  orderFailed: false,
  order: 0,
  orderInfoRequest: false,
  orderInfoFailed: false,
  orderInformation: null
}

export const orderReducer = (state = initialState, action: TOrderActions): IOrder => {
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
    case ORDER_INFO_REQUEST: {
      return {
        ...state,
        orderInfoRequest: true,
        orderInfoFailed: false
      };
    }
    case ORDER_INFO_SUCCESS: {
      return {
        ...state,
        orderInformation: action.payload,
        orderInfoFailed: false,
        orderInfoRequest: false
      };
    }
    case ORDER_INFO_ERROR: {
      return {
        ...state,
        orderInfoFailed: true,
        orderInfoRequest: false
      };
    }
    case ORDER_INFO_RESET: {
      return {
        ...state,
        orderInformation: null
      };
    }
    default: {
      return state;
    }
  }
}  