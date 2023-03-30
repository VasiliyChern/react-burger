import { ingredientCharacteristicReducer, initialState } from './ingredient-characteristic';
import { expect } from '@jest/globals';

import {
  INGREDIENT_CHARACTERISTIC_SET,
  INGREDIENT_CHARACTERISTIC_RESET
} from '../constants/ingredient-characteristic';

describe('ingredient-characteristic reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientCharacteristicReducer(undefined, { type: null })).toEqual(initialState)
  });
 
  it('should handle INGREDIENT_CHARACTERISTIC_SET', () => {
    const ingredient = {
      _id: '',
      name: '',
      type: '',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_mobile: '',
      image_large: '',
      __v: 0
    };
    const state = {
      ...initialState,
      ingredient: ingredient,
    }
    expect(ingredientCharacteristicReducer(initialState, { type: INGREDIENT_CHARACTERISTIC_SET, payload: ingredient })).toEqual(state)
  });
 
  it('should handle INGREDIENT_CHARACTERISTIC_RESET', () => {
    const state = {
      ...initialState,
    }
    expect(ingredientCharacteristicReducer(initialState, { type: INGREDIENT_CHARACTERISTIC_RESET })).toEqual(state)
  });
})
