import type { TGetIngredientsApiActions } from '../actions/offer';
import {
  GET_INGREDIENTS_API_REQUEST,
  GET_INGREDIENTS_API_SUCCESS,
  GET_INGREDIENTS_API_ERROR
} from '../constants/offer';
import { TIngredientType } from '../types/types-burger';

interface IOffer {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: Array<TIngredientType>;
}

export const initialState: IOffer = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: []
}

export const offerReducer = (state = initialState, action: TGetIngredientsApiActions): IOffer => {
  switch (action.type) {
    case GET_INGREDIENTS_API_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false
      };
    }
    case GET_INGREDIENTS_API_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsFailed: false,
        ingredientsRequest: false
      };
    }
    case GET_INGREDIENTS_API_ERROR: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false
      };
    }
    default: {
      return state
    }
  }
}