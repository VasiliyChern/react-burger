import {
  INGREDIENT_CHARACTERISTIC_SET,
  INGREDIENT_CHARACTERISTIC_RESET
} from '../actions/ingredient-characteristic';
import { TIngredientType } from '../utils/types';

interface IIngredientCharacteristic {
  ingredient: TIngredientType | null;
}

const initialState: IIngredientCharacteristic = {
  ingredient: null
}

export const ingredientCharacteristicReducer = (state = initialState, action: any) => {
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
 