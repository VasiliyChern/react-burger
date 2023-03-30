import { selectionReducer, initialState } from './selection';
import { expect } from '@jest/globals';

import {
  SELECTION_INGREDIENT_ADD,
  SELECTION_INGREDIENT_DELETE,
  SELECTION_INGREDIENT_REORDER,
  SELECTION_INGREDIENT_RESET
} from '../constants/selection';

describe('selection reducer', () => {
  it('should return the initial state', () => {
    expect(selectionReducer(undefined, { type: null })).toEqual(initialState)
  });
 
  it('should handle SELECTION_INGREDIENT_ADD', () => {
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
      __v: 0,
      id: ''
    };
    const state = {
      ...initialState,
      filling: [...initialState.filling, ingredient]
    }
    expect(selectionReducer(initialState, { 
      type: SELECTION_INGREDIENT_ADD,
      payload: ingredient
    })).toEqual(state)
  });

  it('should handle SELECTION_INGREDIENT_DELETE', () => {
    const initState = {
      ...initialState,
      filling: [
       { _id: '1',
         name: '1',
         type: '',
         proteins: 0,
         fat: 0,
         carbohydrates: 0,
         calories: 0,
         price: 0,
         image: '',
         image_mobile: '',
         image_large: '',
         __v: 0,
         id: '1'
       }
      ]
    };
    const state = {
      ...initialState,
      filling: []
    }
    expect(selectionReducer(initState, { type: SELECTION_INGREDIENT_DELETE, payload: 0 })).toEqual(state)
  });
 
  it('should handle SELECTION_INGREDIENT_REORDER', () => {
    const initState = {
      ...initialState,
      filling: [
       { _id: '1',
         name: '1',
         type: '',
         proteins: 0,
         fat: 0,
         carbohydrates: 0,
         calories: 0,
         price: 0,
         image: '',
         image_mobile: '',
         image_large: '',
         __v: 0,
         id: '1'
       },
       { _id: '2',
         name: '2',
         type: '',
         proteins: 0,
         fat: 0,
         carbohydrates: 0,
         calories: 0,
         price: 0,
         image: '',
         image_mobile: '',
         image_large: '',
         __v: 0,
         id: '2'
       }
      ]
    };

    const state = {
      ...initialState,
      filling: [
       { _id: '2',
         name: '2',
         type: '',
         proteins: 0,
         fat: 0,
         carbohydrates: 0,
         calories: 0,
         price: 0,
         image: '',
         image_mobile: '',
         image_large: '',
         __v: 0,
         id: '2'
       },
       { _id: '1',
         name: '1',
         type: '',
         proteins: 0,
         fat: 0,
         carbohydrates: 0,
         calories: 0,
         price: 0,
         image: '',
         image_mobile: '',
         image_large: '',
         __v: 0,
         id: '1'
       }
      ]
    };
    expect(selectionReducer(initState, { type: SELECTION_INGREDIENT_REORDER, payload: {to: 1, from: 0} })).toEqual(state)
  });
 
  it('should handle SELECTION_INGREDIENT_RESET', () => {
    const state = {
      ...initialState
    }
    expect(selectionReducer(initialState, { type: SELECTION_INGREDIENT_RESET })).toEqual(state)
  });
})
