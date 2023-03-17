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

const wsMiddleware = createSocketMiddleware(wsActions);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(wsMiddleware)
  },
  devTools: true
});

export default store;