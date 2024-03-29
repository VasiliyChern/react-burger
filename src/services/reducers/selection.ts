import type { TSelectionIngredientActions } from '../actions/selection';
import {
  SELECTION_INGREDIENT_ADD,
  SELECTION_INGREDIENT_DELETE,
  SELECTION_INGREDIENT_REORDER,
  SELECTION_INGREDIENT_RESET
} from '../constants/selection';
import { TIngredientReducerType } from '../types/types-burger';

interface ISelectionIngredients {
  burgerBun: TIngredientReducerType | null;
  filling: Array<TIngredientReducerType>;
} 

export const initialState: ISelectionIngredients = {
  burgerBun: null,
  filling: []
}

export const selectionReducer = (state = initialState, action: TSelectionIngredientActions): ISelectionIngredients => {
  switch (action.type) {
    case SELECTION_INGREDIENT_ADD: {
      if (action.payload.type === 'bun') {
        return {
          ...state, 
          burgerBun: action.payload
        };
      }
      return {
        ...state,
        filling: [
          ...state.filling, 
          action.payload
        ],
      };
    }
    case SELECTION_INGREDIENT_DELETE: {
      return {
        ...state,
        filling: [
          ...state.filling.slice(0, action.payload),
          ...state.filling.slice(action.payload + 1)
        ]
      };
    }
    case SELECTION_INGREDIENT_REORDER: {
      const filling = [...state.filling];
      filling.splice(action.payload.to, 0, filling.splice(action.payload.from, 1)[0]);
   
      return {
        ...state,
        filling
      };
    }
    case SELECTION_INGREDIENT_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}