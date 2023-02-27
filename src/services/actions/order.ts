import { postApiBurgerOrder } from '../utils/data';
import { SELECTION_INGREDIENT_RESET } from './selection';
import { TDispatch } from '../types/types-store';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';
export const ORDER_RESET = 'ORDER_RESET';

export function orderBurger(details: Array<string>) {
  return function (dispatch: TDispatch) {
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
  }
}