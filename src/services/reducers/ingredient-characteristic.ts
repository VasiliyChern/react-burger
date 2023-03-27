import type { TIngredientCharacteristicActions } from '../actions/ingredient-characteristic';
import {
  INGREDIENT_CHARACTERISTIC_SET,
  INGREDIENT_CHARACTERISTIC_RESET
} from '../constants/ingredient-characteristic';
import { TIngredientType } from '../types/types-burger';

interface IIngredientCharacteristic {
  ingredient: TIngredientType | null;
}

export const initialState: IIngredientCharacteristic = {
  ingredient: null
}

export const ingredientCharacteristicReducer = (state = initialState, action: TIngredientCharacteristicActions): IIngredientCharacteristic => {
  switch (action.type) {
    case INGREDIENT_CHARACTERISTIC_SET: {
      return {
        ...state,
        ingredient: action.payload
      };
    }
    case INGREDIENT_CHARACTERISTIC_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
 