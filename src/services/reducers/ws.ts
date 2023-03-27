import {
  WS_CONNECTION_OPEN,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../constants/ws';
import { wsocketStatus } from '../constants/enums';
import type { TWsActions } from '../actions/ws';
import { TwsOrderType } from '../types/types-burger';

interface Iwsocket {
  wsConnectedStatus: wsocketStatus,
  orders: Array<TwsOrderType>,
  total: number | null,
  totalToday: number | null,
  error: string | undefined
}

export const initialState: Iwsocket = {
  wsConnectedStatus: wsocketStatus.OFFLINE,
  orders: [],
  total: null,
  totalToday: null,
  error: undefined
};

export const wsReducer = (state = initialState, action: TWsActions): Iwsocket => {
  switch (action.type) {
    case WS_CONNECTION_OPEN:
      return {
        ...state,
        wsConnectedStatus: wsocketStatus.ONLINE,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnectedStatus: wsocketStatus.CONNECTING,
        orders: []
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnectedStatus: wsocketStatus.OFFLINE
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnectedStatus: wsocketStatus.OFFLINE,
        orders: []
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: [...action.payload.orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    default:
      return state;
  }
};
