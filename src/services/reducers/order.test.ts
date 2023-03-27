import { orderReducer, initialState } from './order';
import { TwsOrderType } from '../types/types-burger';
import { expect } from '@jest/globals';

import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  ORDER_RESET,
  ORDER_INFO_REQUEST,
  ORDER_INFO_SUCCESS,
  ORDER_INFO_ERROR,
  ORDER_INFO_RESET
} from '../constants/order';

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, { type: null })).toEqual(initialState)
  });
 
  it('should handle ORDER_REQUEST', () => {
    const state = {
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    }
    expect(orderReducer(initialState, { type: ORDER_REQUEST })).toEqual(state)
  });

  it('should handle ORDER_SUCCESS', () => {
    const numberOrder = 0;
    const state = {
      ...initialState,
      order: numberOrder,
      orderFailed: false,
      orderRequest: false
    }
    expect(orderReducer(initialState, { type: ORDER_SUCCESS, payload: numberOrder })).toEqual(state)
  });
 
  it('should handle ORDER_ERROR', () => {
    const state = {
      ...initialState,
      orderFailed: true,
      orderRequest: false
    }
    expect(orderReducer(initialState, { type: ORDER_ERROR })).toEqual(state)
  });
 
  it('should handle ORDER_RESET', () => {
    const state = {
      ...initialState,
      order: null,
      orderFailed: false,
      orderRequest: false
    }
    expect(orderReducer(initialState, { type: ORDER_RESET })).toEqual(state)
  });
 
  it('should handle ORDER_INFO_REQUEST', () => {
    const state = {
      ...initialState,
      orderInfoRequest: true,
      orderInfoFailed: false,
    }
    expect(orderReducer(initialState, { type: ORDER_INFO_REQUEST })).toEqual(state)
  });

  it('should handle ORDER_INFO_SUCCESS', () => {
    const orderInfo: TwsOrderType = {
      ingredients: [],
      _id: '',
      status: 'done',
      number: 0,
      createdAt: '',
      updatedAt: '',
      name: ''
    };
    const state = {
      ...initialState,
      orderInformation: orderInfo,
      orderInfoFailed: false,
      orderInfoRequest: false
    }
    expect(orderReducer(initialState, { type: ORDER_INFO_SUCCESS, payload: orderInfo })).toEqual(state)
  });
 
  it('should handle ORDER_INFO_ERROR', () => {
    const state = {
      ...initialState,
      orderInfoFailed: true,
      orderInfoRequest: false
    }
    expect(orderReducer(initialState, { type: ORDER_INFO_ERROR })).toEqual(state)
  });
 
  it('should handle ORDER_INFO_RESET', () => {
    const state = {
      ...initialState,
      orderInformation: null,
      orderInfoFailed: false,
      orderInfoRequest: false
    }
    expect(orderReducer(initialState, { type: ORDER_INFO_RESET })).toEqual(state)
  });
})
