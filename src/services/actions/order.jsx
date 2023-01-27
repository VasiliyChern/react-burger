import { postApiBurgerOrder } from '../utils/data';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';
export const ORDER_RESET = 'ORDER_RESET';

export function orderBurger(details) {
  return function (dispatch) {
    dispatch({
      type: ORDER_REQUEST
    })
    postApiBurgerOrder(details)
      .then(resulst => {
        if (resulst && resulst.success) {
          dispatch({
            type: ORDER_SUCCESS,
            payload: resulst
          })
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