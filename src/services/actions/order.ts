import { postApiBurgerOrder, getApiBurgerOrderInfo } from '../utils/data';
import { AppDispatch } from '../types/types-store';
import { TwsOrderType } from '../types/types-burger';
import { SELECTION_INGREDIENT_RESET } from '../constants/selection';
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  ORDER_RESET,
  ORDER_INFO_REQUEST,
  ORDER_INFO_SUCCESS,
  ORDER_INFO_ERROR
} from '../constants/order';

export interface IOrderRequestAction {
  readonly type: typeof ORDER_REQUEST;
}
export interface IOrderSuccessAction {
  readonly type: typeof ORDER_SUCCESS;
  readonly payload: number;
}
export interface IOrderErrorAction {
  readonly type: typeof ORDER_ERROR;
}
export interface IOrderResetAction {
  readonly type: typeof ORDER_RESET;
}
export interface IOrderInfoRequestAction {
  readonly type: typeof ORDER_INFO_REQUEST;
}
export interface IOrderInfoSuccessAction {
  readonly type: typeof ORDER_INFO_SUCCESS;
  readonly payload: TwsOrderType;
}
export interface IOrderInfoErrorAction {
  readonly type: typeof ORDER_INFO_ERROR;
}

export type TOrderActions = 
  | IOrderRequestAction
  | IOrderSuccessAction
  | IOrderErrorAction
  | IOrderResetAction
  | IOrderInfoRequestAction
  | IOrderInfoSuccessAction
  | IOrderInfoErrorAction

export const orderBurger = (details: Array<string>) => (dispatch: AppDispatch) => {
  dispatch({
    type: ORDER_REQUEST
  })
  postApiBurgerOrder(details)
    .then(result => {
      if (result && result.success) {
        dispatch({
          type: ORDER_SUCCESS,
          payload: result.order.number
        });
        dispatch({
          type: SELECTION_INGREDIENT_RESET
        });
      } else {
        dispatch({
          type: ORDER_ERROR
        })
      }
    })
    .catch(error => {
      dispatch({
        type: ORDER_ERROR
      })
    })
};

export const orderInfoBurger = (numberOrder: string | undefined) => (dispatch: AppDispatch) => {
  dispatch({
    type: ORDER_INFO_REQUEST
  })
  getApiBurgerOrderInfo(numberOrder)
    .then(result => {
      if (result && result.success) {
        dispatch({
          type: ORDER_INFO_SUCCESS,
          payload: result.orders[0]
        });
      } else {
        dispatch({
          type: ORDER_INFO_ERROR
        })
      }
    })
    .catch(error => {
      dispatch({
        type: ORDER_INFO_ERROR
      })
    })
};
