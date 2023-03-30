import { wsPersonReducer, initialState } from './ws-person';
import { IWsPersonMessage } from '../actions/ws-person';
import { expect } from '@jest/globals';

import {
  WS_PERSON_OPEN,
  WS_PERSON_SUCCESS,
  WS_PERSON_ERROR,
  WS_PERSON_CLOSED,
  WS_PERSON_GET_MESSAGE
} from '../constants/ws-person';
import { wsocketStatus } from '../constants/enums';

describe('ws-person reducer', () => {
  it('should return the initial state', () => {
    expect(wsPersonReducer(undefined, { type: null })).toEqual(initialState)
  });

  it('should handle WS_PERSON_OPEN', () => {
    const state = {
      ...initialState,
      wsPersonStatus: wsocketStatus.ONLINE
    }
    expect(wsPersonReducer(initialState, { type: WS_PERSON_OPEN })).toEqual(state)
  });

  it('should handle WS_PERSON_SUCCESS', () => {
    const state = {
      ...initialState,
      error: undefined,
      wsPersonStatus: wsocketStatus.CONNECTING,
      personOrders: []
    }
    expect(wsPersonReducer(initialState, { type: WS_PERSON_SUCCESS })).toEqual(state)
  });

  it('should handle WS_PERSON_ERROR', () => {
    const state = {
      ...initialState,
      error: 'test error',
      wsPersonStatus: wsocketStatus.OFFLINE
    }
    expect(wsPersonReducer(initialState, { type: WS_PERSON_ERROR, payload: 'test error' })).toEqual(state)
  });

  it('should handle WS_PERSON_CLOSED', () => {
    const state = {
      ...initialState,
      error: undefined,
      wsPersonStatus: wsocketStatus.OFFLINE,
      personOrders: []
    }
    expect(wsPersonReducer(initialState, { type: WS_PERSON_CLOSED })).toEqual(state)
  });

  it('should handle WS_PERSON_GET_MESSAGE', () => {
    const testMessage: IWsPersonMessage = {
      orders: [
        { ingredients: ['t1', 't2', 't3'],
          _id: '1',
          status: 'done',
          number: 1,
          createdAt: '',
          updatedAt: '',
          name: 'Тестовое название'
        }
      ]
    };
    const state = {
      ...initialState,
      error: undefined,
      personOrders: [
        { ingredients: ['t1', 't2', 't3'],
          _id: '1',
          status: 'done',
          number: 1,
          createdAt: '',
          updatedAt: '',
          name: 'Тестовое название'
        }
      ]
    }
    expect(wsPersonReducer(initialState, { type: WS_PERSON_GET_MESSAGE, payload: testMessage })).toEqual(state)
  });
})
