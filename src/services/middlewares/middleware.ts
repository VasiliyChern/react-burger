import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../types/types-store";
import { TwsActionTypes } from '../types/types-ws';
import { TWsActions,
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionOpen,
  wsConnectionClosed,
  wsConnectionError,
  wsGetMessage
} from '../actions/ws';

const WS_СLOSE_NORMAL = 1000;

export const createSocketMiddleware = (wsActions: TwsActionTypes): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let timerWsReconnect = 0;
    let isWsConnected = false;
    let url = '';
    
    return next => (action: TWsActions) => {
      const { dispatch } = store;

      if (action.type === wsActions.onStart) {
        url = action.payload;
        socket = new WebSocket(url);
        isWsConnected = true;
        window.clearTimeout(timerWsReconnect);
        dispatch(wsConnectionSuccess()) 
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(wsConnectionOpen());
        };

        socket.onclose = event => {
          if(event.code !== WS_СLOSE_NORMAL){
            dispatch(wsConnectionClosed());
            socket?.close();
          }
          if (isWsConnected) {
            dispatch(wsConnectionSuccess());
            timerWsReconnect = window.setTimeout(() => {
              dispatch(wsConnectionStart(url));
            }, 3000)
          }
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch(wsGetMessage(restParsedData));
        };

        socket.onerror = event => {
          dispatch(wsConnectionError('Error in websocket'));
        };

        if (action.type === wsActions.onDisconnect) {
          window.clearTimeout(timerWsReconnect);
          isWsConnected = false;
          timerWsReconnect = 0;
          socket.close();
          dispatch(wsConnectionClosed());
        }
      }
      next(action);
    };
  };
};
