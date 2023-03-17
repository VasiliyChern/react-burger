import {
  INGREDIENT_CHARACTERISTIC_SET,
  INGREDIENT_CHARACTERISTIC_RESET
} from '../constants/ingredient-characteristic';
import { TIngredientType } from '../types/types-burger';

export interface IIngredientCharacteristicSetAction {
  readonly type: typeof INGREDIENT_CHARACTERISTIC_SET;
  readonly payload: TIngredientType;
}
export interface IIngredientCharacteristicResetAction {
  readonly type: typeof INGREDIENT_CHARACTERISTIC_RESET;
}

export type TIngredientCharacteristicActions = 
  | IIngredientCharacteristicSetAction
  | IIngredientCharacteristicResetAction
