import {
  WS_PERSON_START,
  WS_PERSON_OPEN,
  WS_PERSON_SUCCESS,
  WS_PERSON_CLOSED,
  WS_PERSON_DISCONNECT,
  WS_PERSON_ERROR,
  WS_PERSON_GET_MESSAGE
} from '../constants/ws-person';

export type TwsPersonActionTypes = {
  onStart: typeof WS_PERSON_START,
  onOpen: typeof WS_PERSON_OPEN,
  onSuccess: typeof WS_PERSON_SUCCESS,
  onClosed: typeof WS_PERSON_CLOSED,
  onDisconnect: typeof WS_PERSON_DISCONNECT,
  onError: typeof WS_PERSON_ERROR,
  onMessage: typeof WS_PERSON_GET_MESSAGE
} 