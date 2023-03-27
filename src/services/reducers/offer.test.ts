import { offerReducer, initialState } from './offer';
import { expect } from '@jest/globals';

import {
  GET_INGREDIENTS_API_REQUEST,
  GET_INGREDIENTS_API_SUCCESS,
  GET_INGREDIENTS_API_ERROR
} from '../constants/offer';

describe('offer reducer', () => {
  it('should return the initial state', () => {
    expect(offerReducer(undefined, { type: null })).toEqual(initialState)
  });
 
  it('should handle GET_INGREDIENTS_API_REQUEST', () => {
    const state = {
      ...initialState,
      ingredientsRequest: true,
      ingredientsFailed: false,
    }
    expect(offerReducer(initialState, { type: GET_INGREDIENTS_API_REQUEST })).toEqual(state)
  });

  it('should handle GET_INGREDIENTS_API_SUCCESS', () => {
    const state = {
      ...initialState,
      ingredients: [],
      ingredientsFailed: false,
      ingredientsRequest: false
    }
    expect(offerReducer(initialState, { type: GET_INGREDIENTS_API_SUCCESS, payload: [] })).toEqual(state)
  });
 
  it('should handle GET_INGREDIENTS_API_ERROR', () => {
    const state = {
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: false
    }
    expect(offerReducer(initialState, { type: GET_INGREDIENTS_API_ERROR })).toEqual(state)
  });
})
