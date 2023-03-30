import { TwsOrderType } from '../types/types-burger';
import { INullTypeAction } from '../types/types-api';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_OPEN,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_DISCONNECT,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE
} from '../constants/ws';

export interface IWsMessage {
  orders: TwsOrderType[],
  total: number | null,
  totalToday: number | null
}

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  payload: string;
}
export interface IWsConnectionOpenAction {
  readonly type: typeof WS_CONNECTION_OPEN;
}
export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsConnectionDisconnectAction {
  readonly type: typeof WS_CONNECTION_DISCONNECT;
}
export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: string | undefined;
}
export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  payload: IWsMessage;
}

export type TWsActions = 
  | IWsConnectionStartAction
  | IWsConnectionOpenAction
  | IWsConnectionSuccessAction
  | IWsConnectionClosedAction
  | IWsConnectionDisconnectAction
  | IWsConnectionErrorAction
  | IWsGetMessageAction
  | INullTypeAction

export const wsConnectionStart = (url: string): IWsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START,
    payload: url
  }
} 

export const wsConnectionOpen = (): IWsConnectionOpenAction => {
  return {
    type: WS_CONNECTION_OPEN,
  }
}

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  }
}

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED
  }
} 

export const wsConnectionDisconnect = (): IWsConnectionDisconnectAction => {
  return {
    type: WS_CONNECTION_DISCONNECT
  }
} 

export const wsConnectionError = (error: string): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: error
  }
} 

export const wsGetMessage = (message: any): IWsGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  }
} 