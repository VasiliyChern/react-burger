import { getApiBurgerIngredients } from '../utils/data';
import { AppDispatch } from '../types/types-store';
import { TIngredientType } from '../types/types-burger';
import {
  GET_INGREDIENTS_API_REQUEST,
  GET_INGREDIENTS_API_SUCCESS,
  GET_INGREDIENTS_API_ERROR
} from '../constants/offer';

export interface IGetIngredientsApiRequestAction {
  readonly type: typeof GET_INGREDIENTS_API_REQUEST;
}
export interface IGetIngredientsApiSuccessAction {
  readonly type: typeof GET_INGREDIENTS_API_SUCCESS;
  readonly payload: Array<TIngredientType>;
}
export interface IGetIngredientsApiErrorAction {
  readonly type: typeof GET_INGREDIENTS_API_ERROR;
}

export type TGetIngredientsApiActions = 
  | IGetIngredientsApiRequestAction
  | IGetIngredientsApiSuccessAction
  | IGetIngredientsApiErrorAction

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_API_REQUEST
  });
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
    });
};
