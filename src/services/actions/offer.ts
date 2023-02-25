import { getApiBurgerIngredients } from '../utils/data';
import { TDispatch } from '../utils/types';

export const GET_INGREDIENTS_API_REQUEST = 'GET_INGREDIENTS_API_REQUEST';
export const GET_INGREDIENTS_API_SUCCESS = 'GET_INGREDIENTS_API_SUCCESS';
export const GET_INGREDIENTS_API_ERROR = 'GET_INGREDIENTS_API_ERROR';

export function getIngredients() {
  return function (dispatch: TDispatch) {
    dispatch({
      type: GET_INGREDIENTS_API_REQUEST
    })
    getApiBurgerIngredients()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_API_SUCCESS,
            payload: res.data
          })
        } else {
          dispatch({
            type: GET_INGREDIENTS_API_ERROR
          })
        }
      })
      .catch(error => {
        dispatch({
          type: GET_INGREDIENTS_API_ERROR
        })
      })
  }
}