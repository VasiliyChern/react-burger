import {v4 as uuidv4} from 'uuid';

export const SELECTION_INGREDIENT_ADD = 'SELECTION_INGREDIENT_ADD';
export const SELECTION_INGREDIENT_DELETE = 'SELECTION_INGREDIENT_DELETE';
export const SELECTION_INGREDIENT_REORDER = 'SELECTION_INGREDIENT_REORDER';
export const SELECTION_INGREDIENT_RESET = 'SELECTION_INGREDIENT_RESET';

export const addIngredientToSelection = (ingredient) => {
  return {
    type: SELECTION_INGREDIENT_ADD,
    payload : {
      ...ingredient,
      id: uuidv4()
    }
  }
}