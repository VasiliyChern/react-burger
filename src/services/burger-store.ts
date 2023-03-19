import {rootReducer} from './reducers/index';
import {configureStore} from '@reduxjs/toolkit';
import { 
  WS_CONNECTION_START,
  WS_CONNECTION_OPEN,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_DISCONNECT,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE
} from './constants/ws';
import { 
  WS_PERSON_START,
  WS_PERSON_OPEN,
  WS_PERSON_SUCCESS,
  WS_PERSON_CLOSED,
  WS_PERSON_DISCONNECT,
  WS_PERSON_ERROR,
  WS_PERSON_GET_MESSAGE
} from './constants/ws-person';
import { createSocketMiddleware } from './middlewares/middleware';

const wsActions = {
  onStart: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_OPEN,
  onSuccess: WS_CONNECTION_SUCCESS,
  onClosed: WS_CONNECTION_CLOSED,
  onDisconnect: WS_CONNECTION_DISCONNECT,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
}; 
const wsPersonActions = {
  onStart: WS_PERSON_START,
  onOpen: WS_PERSON_OPEN,
  onSuccess: WS_PERSON_SUCCESS,
  onClosed: WS_PERSON_CLOSED,
  onDisconnect: WS_PERSON_DISCONNECT,
  onError: WS_PERSON_ERROR,
  onMessage: WS_PERSON_GET_MESSAGE
}; 

const wsMiddleware = createSocketMiddleware(wsActions);
const wsPersonMiddleware = createSocketMiddleware(wsPersonActions);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(wsMiddleware).concat(wsPersonMiddleware)
  },
  devTools: true
});

export default store;