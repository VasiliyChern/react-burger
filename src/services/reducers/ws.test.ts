import { wsReducer, initialState } from './ws';
import { IWsMessage } from '../actions/ws';
import { expect } from '@jest/globals';

import {
  WS_CONNECTION_OPEN,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../constants/ws';
import { wsocketStatus } from '../constants/enums';

describe('ws reducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, { type: null })).toEqual(initialState)
  });

  it('should handle WS_CONNECTION_OPEN', () => {
    const state = {
      ...initialState,
      wsConnectedStatus: wsocketStatus.ONLINE
    }
    expect(wsReducer(initialState, { type: WS_CONNECTION_OPEN })).toEqual(state)
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    const state = {
      ...initialState,
      error: undefined,
      wsConnectedStatus: wsocketStatus.CONNECTING,
      orders: []
    }
    expect(wsReducer(initialState, { type: WS_CONNECTION_SUCCESS })).toEqual(state)
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    const state = {
      ...initialState,
      error: 'test error',
      wsConnectedStatus: wsocketStatus.OFFLINE
    }
    expect(wsReducer(initialState, { type: WS_CONNECTION_ERROR, payload: 'test error' })).toEqual(state)
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    const state = {
      ...initialState,
      error: undefined,
      wsConnectedStatus: wsocketStatus.OFFLINE,
      orders: []
    }
    expect(wsReducer(initialState, { type: WS_CONNECTION_CLOSED })).toEqual(state)
  });

  it('should handle WS_GET_MESSAGE', () => {
    const testMessage: IWsMessage = {
      orders: [
        { ingredients: ['t1', 't2', 't3'],
          _id: '1',
          status: 'done',
          number: 1,
          createdAt: '',
          updatedAt: '',
          name: 'Тестовое название'
        }
      ],
      total: 1000,
      totalToday: 100
    };
    const state = {
      ...initialState,
      error: undefined,
      orders: [
        { ingredients: ['t1', 't2', 't3'],
          _id: '1',
          status: 'done',
          number: 1,
          createdAt: '',
          updatedAt: '',
          name: 'Тестовое название'
        }
      ],
      total: 1000,
      totalToday: 100
    }
    expect(wsReducer(initialState, { type: WS_GET_MESSAGE, payload: testMessage })).toEqual(state)
  });
})
