import {v4 as uuidv4} from 'uuid';
import { TIngredientType, TIngredientReducerType, TIngredientPosition } from '../types/types-burger';
import {
  SELECTION_INGREDIENT_ADD,
  SELECTION_INGREDIENT_DELETE,
  SELECTION_INGREDIENT_REORDER,
  SELECTION_INGREDIENT_RESET
} from '../constants/selection';

export interface ISelectionIngredientAddAction {
  readonly type: typeof SELECTION_INGREDIENT_ADD;
  readonly payload: TIngredientReducerType;
}
export interface ISelectionIngredientDeleteAction {
  readonly type: typeof SELECTION_INGREDIENT_DELETE;
  readonly payload: number;
}
export interface ISelectionIngredientReorderAction {
  readonly type: typeof SELECTION_INGREDIENT_REORDER;
  readonly payload: TIngredientPosition;
}
export interface ISelectionIngredientResetAction {
  readonly type: typeof SELECTION_INGREDIENT_RESET;
}

export type TSelectionIngredientActions = 
  | ISelectionIngredientAddAction
  | ISelectionIngredientDeleteAction
  | ISelectionIngredientReorderAction
  | ISelectionIngredientResetAction

export const addIngredientToSelection = (ingredient: TIngredientType): ISelectionIngredientAddAction => {
  return {
    type: SELECTION_INGREDIENT_ADD,
    payload : {
      ...ingredient,
      id: uuidv4()
    }
  }
}