import {
  INGREDIENT_CHARACTERISTIC_SET,
  INGREDIENT_CHARACTERISTIC_RESET
} from '../actions/ingredient-characteristic';

const initialState = {
  ingredient: null
}

export const ingredientCharacteristicReducer = (state = initialState, action) => {
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
 