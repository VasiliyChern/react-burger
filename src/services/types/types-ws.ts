import {
  WS_CONNECTION_START,
  WS_CONNECTION_OPEN,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_DISCONNECT,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE
} from '../constants/ws';

export type TwsConnectionActionTypes = {
  onStart: typeof WS_CONNECTION_START,
  onOpen: typeof WS_CONNECTION_OPEN,
  onSuccess: typeof WS_CONNECTION_SUCCESS,
  onClosed: typeof WS_CONNECTION_CLOSED,
  onDisconnect: typeof WS_CONNECTION_DISCONNECT,
  onError: typeof WS_CONNECTION_ERROR,
  onMessage: typeof WS_GET_MESSAGE
} 