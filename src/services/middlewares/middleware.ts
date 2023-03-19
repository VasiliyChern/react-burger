import { Middleware, MiddlewareAPI, AnyAction } from "redux";
import { AppDispatch, TRootState } from "../types/types-store";
import { TwsActionTypes } from '../types/types-store';
import { postApiRenewalTokenUser } from '../utils/data';

const WS_СLOSE_NORMAL = 1000;

export const createSocketMiddleware = (wsActions: TwsActionTypes): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;
    let timerWsReconnect = 0;
    let isWsConnected = false;
    let url = '';
    
    return next => (action: AnyAction) => {
      const { dispatch } = store;

      if (action.type === wsActions.onStart) {
        url = action.payload;
        socket = new WebSocket(url);
        isWsConnected = true;
        window.clearTimeout(timerWsReconnect);
        dispatch({type: wsActions.onSuccess}) 
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({type: wsActions.onOpen});
        };

        socket.onclose = event => {
          if(event.code !== WS_СLOSE_NORMAL){
            dispatch({type: wsActions.onClosed});
            socket?.close();
          }
          if (isWsConnected) {
            dispatch({type: wsActions.onSuccess});
            timerWsReconnect = window.setTimeout(() => {
              dispatch({
                type: wsActions.onStart,
                payload: url
              });
            }, 3000)
          }
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (!parsedData?.success && parsedData?.message === 'Invalid or missing token') {
            postApiRenewalTokenUser();
          }
          else {
            dispatch({type: wsActions.onMessage,
              payload: parsedData
            });
          }
        };

        socket.onerror = event => {
          dispatch({type: wsActions.onError,
            payload: 'Error in websocket'
          });
        };

        if (action.type === wsActions.onDisconnect) {
          window.clearTimeout(timerWsReconnect);
          isWsConnected = false;
          timerWsReconnect = 0;
          socket.close();
          dispatch({type: wsActions.onClosed});
        }
      }
      next(action);
    };
  };
};
