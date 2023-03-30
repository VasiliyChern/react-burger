import {
  WS_PERSON_OPEN,
  WS_PERSON_SUCCESS,
  WS_PERSON_ERROR,
  WS_PERSON_CLOSED,
  WS_PERSON_GET_MESSAGE
} from '../constants/ws-person';
import { wsocketStatus } from '../constants/enums';
import type { TWsPersonActions } from '../actions/ws-person';
import { TwsOrderType } from '../types/types-burger';

interface IpersonSocket {
  wsPersonStatus: wsocketStatus,
  personOrders: Array<TwsOrderType>,
  error: string | undefined
}

export const initialState: IpersonSocket = {
  wsPersonStatus: wsocketStatus.OFFLINE,
  personOrders: [],
  error: undefined
};

export const wsPersonReducer = (state = initialState, action: TWsPersonActions): IpersonSocket => {
  switch (action.type) {
    case WS_PERSON_OPEN:
      return {
        ...state,
        wsPersonStatus: wsocketStatus.ONLINE
      };
    case WS_PERSON_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsPersonStatus: wsocketStatus.CONNECTING,
        personOrders: []
      };
    case WS_PERSON_ERROR:
      return {
        ...state,
        error: action.payload,
        wsPersonStatus: wsocketStatus.OFFLINE
      };
    case WS_PERSON_CLOSED:
      return {
        ...state,
        error: undefined,
        wsPersonStatus: wsocketStatus.OFFLINE,
        personOrders: []
      };
    case WS_PERSON_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        personOrders: [...action.payload.orders]
      };
    default:
      return state;
  }
};
