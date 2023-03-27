import { TwsOrderType } from '../types/types-burger';
import { INullTypeAction } from '../types/types-api';
import {
  WS_PERSON_START,
  WS_PERSON_OPEN,
  WS_PERSON_SUCCESS,
  WS_PERSON_CLOSED,
  WS_PERSON_DISCONNECT,
  WS_PERSON_ERROR,
  WS_PERSON_GET_MESSAGE
} from '../constants/ws-person';

export interface IWsPersonMessage {
  orders: TwsOrderType[]
}

export interface IWsPersonStartAction {
  readonly type: typeof WS_PERSON_START;
  payload: string;
}
export interface IWsPersonOpenAction {
  readonly type: typeof WS_PERSON_OPEN;
}
export interface IWsPersonSuccessAction {
  readonly type: typeof WS_PERSON_SUCCESS;
}
export interface IWsPersonClosedAction {
  readonly type: typeof WS_PERSON_CLOSED;
}
export interface IWsPersonDisconnectAction {
  readonly type: typeof WS_PERSON_DISCONNECT;
}
export interface IWsPersonErrorAction {
  readonly type: typeof WS_PERSON_ERROR;
  payload: string | undefined;
}
export interface IWsPersonGetMessageAction {
  readonly type: typeof WS_PERSON_GET_MESSAGE;
  payload: IWsPersonMessage;
}

export type TWsPersonActions = 
  | IWsPersonStartAction
  | IWsPersonOpenAction
  | IWsPersonSuccessAction
  | IWsPersonClosedAction
  | IWsPersonDisconnectAction
  | IWsPersonErrorAction
  | IWsPersonGetMessageAction
  | INullTypeAction

export const wsPersonStart = (url: string): IWsPersonStartAction => {
  return {
    type: WS_PERSON_START,
    payload: url
  }
} 

export const wsPersonOpen = (): IWsPersonOpenAction => {
  return {
    type: WS_PERSON_OPEN,
  }
}

export const wsPersonSuccess = (): IWsPersonSuccessAction => {
  return {
    type: WS_PERSON_SUCCESS,
  }
}

export const wsPersonClosed = (): IWsPersonClosedAction => {
  return {
    type: WS_PERSON_CLOSED
  }
} 

export const wsPersonDisconnect = (): IWsPersonDisconnectAction => {
  return {
    type: WS_PERSON_DISCONNECT
  }
} 

export const wsPersonError = (error: string): IWsPersonErrorAction => {
  return {
    type: WS_PERSON_ERROR,
    payload: error
  }
} 

export const wsPersonGetMessage = (message: any): IWsPersonGetMessageAction => {
  return {
    type: WS_PERSON_GET_MESSAGE,
    payload: message
  }
} 