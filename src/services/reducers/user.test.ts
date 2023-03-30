import { userReducer, initialState } from './user';
import { expect } from '@jest/globals';

import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,

  PASSWORD_CREATE_NEW_REQUEST,
  PASSWORD_CREATE_NEW_SUCCESS,
  PASSWORD_CREATE_NEW_ERROR,

  REGISTRATION_USER_REQUEST,
  REGISTRATION_USER_SUCCESS,
  REGISTRATION_USER_ERROR,

  AUTHENTICATION_USER_REQUEST,
  AUTHENTICATION_USER_SUCCESS,
  AUTHENTICATION_USER_ERROR,

  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,

  RENEWAL_TOKEN_REQUEST,
  RENEWAL_TOKEN_SUCCESS,
  RENEWAL_TOKEN_ERROR,

  RENEWAL_INFO_USER_REQUEST,
  RENEWAL_INFO_USER_SUCCESS,
  RENEWAL_INFO_USER_ERROR,

  UPDATE_INFO_USER_REQUEST,
  UPDATE_INFO_USER_SUCCESS,
  UPDATE_INFO_USER_ERROR
} from '../constants/user';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: null })).toEqual(initialState)
  });

  it('should handle PASSWORD_RESET_REQUEST', () => {
    const state = {
      ...initialState,
      passwordResetRequest: true,
      passwordResetFailed: false
    }
    expect(userReducer(initialState, { type: PASSWORD_RESET_REQUEST })).toEqual(state)
  });

  it('should handle PASSWORD_RESET_SUCCESS', () => {
    const state = {
      ...initialState,
      passwordInfo: 'testPasswordInfo',
      passwordResetFailed: false,
      passwordResetRequest: false
    }
    expect(userReducer(initialState, { type: PASSWORD_RESET_SUCCESS, payload: 'testPasswordInfo' })).toEqual(state)
  });
 
  it('should handle PASSWORD_RESET_ERROR', () => {
    const state = {
      ...initialState,
      passwordResetFailed: true,
      passwordResetRequest: false
    }
    expect(userReducer(initialState, { type: PASSWORD_RESET_ERROR })).toEqual(state)
  });

  it('should handle PASSWORD_CREATE_NEW_REQUEST', () => {
    const state = {
      ...initialState,
      passwordCreateNewRequest: true,
      passwordCreateNewFailed: false
    }
    expect(userReducer(initialState, { type: PASSWORD_CREATE_NEW_REQUEST })).toEqual(state)
  });

  it('should handle PASSWORD_CREATE_NEW_SUCCESS', () => {
    const state = {
      ...initialState,
      passwordNewInfo: 'testPasswordNewInfo',
      passwordCreateNewFailed: false,
      passwordCreateNewRequest: false
    }
    expect(userReducer(initialState, { type: PASSWORD_CREATE_NEW_SUCCESS, payload: 'testPasswordNewInfo' })).toEqual(state)
  });
 
  it('should handle PASSWORD_CREATE_NEW_ERROR', () => {
    const state = {
      ...initialState,
      passwordCreateNewFailed: true,
      passwordCreateNewRequest: false
    }
    expect(userReducer(initialState, { type: PASSWORD_CREATE_NEW_ERROR })).toEqual(state)
  });

  it('should handle REGISTRATION_USER_REQUEST', () => {
    const state = {
      ...initialState,
      registrationUserRequest: true,
      registrationUserFailed: false
    }
    expect(userReducer(initialState, { type: REGISTRATION_USER_REQUEST })).toEqual(state)
  });

  it('should handle REGISTRATION_USER_SUCCESS', () => {
    const testUserInfo = {
      email: 'testEmail@ya.ru',
      name: 'testName'
    };
    const state = {
      ...initialState,
      userInfo: testUserInfo,
      registrationUserFailed: false,
      registrationUserRequest: false
    }
    expect(userReducer(initialState, { type: REGISTRATION_USER_SUCCESS, payload: testUserInfo })).toEqual(state)
  });
 
  it('should handle REGISTRATION_USER_ERROR', () => {
    const state = {
      ...initialState,
      registrationUserFailed: true,
      registrationUserRequest: false
    }
    expect(userReducer(initialState, { type: REGISTRATION_USER_ERROR })).toEqual(state)
  });

  it('should handle AUTHENTICATION_USER_REQUEST', () => {
    const state = {
      ...initialState,
      authenticationUserRequest: true,
      authenticationUserFailed: false
    }
    expect(userReducer(initialState, { type: AUTHENTICATION_USER_REQUEST })).toEqual(state)
  });

  it('should handle AUTHENTICATION_USER_SUCCESS', () => {
    const testUserInfo = {
      email: 'testEmail@ya.ru',
      name: 'testName'
    };
    const state = {
      ...initialState,
      userInfo: testUserInfo,
      authenticationUserFailed: false,
      authenticationUserRequest: false
    }
    expect(userReducer(initialState, { type: AUTHENTICATION_USER_SUCCESS, payload: testUserInfo })).toEqual(state)
  });
 
  it('should handle AUTHENTICATION_USER_ERROR', () => {
    const state = {
      ...initialState,
      authenticationUserFailed: true,
      authenticationUserRequest: false
    }
    expect(userReducer(initialState, { type: AUTHENTICATION_USER_ERROR })).toEqual(state)
  });

  it('should handle LOGOUT_USER_REQUEST', () => {
    const state = {
      ...initialState,
      logoutUserRequest: true,
      logoutUserFailed: false
    }
    expect(userReducer(initialState, { type: LOGOUT_USER_REQUEST })).toEqual(state)
  });

  it('should handle LOGOUT_USER_SUCCESS', () => {
    const state = {
      ...initialState,
      userInfo: null,
      logoutUserFailed: false,
      logoutUserRequest: false
    }
    expect(userReducer(initialState, { type: LOGOUT_USER_SUCCESS })).toEqual(state)
  });
 
  it('should handle LOGOUT_USER_ERROR', () => {
    const state = {
      ...initialState,
      logoutUserFailed: true,
      logoutUserRequest: false
    }
    expect(userReducer(initialState, { type: LOGOUT_USER_ERROR })).toEqual(state)
  });

  it('should handle RENEWAL_TOKEN_REQUEST', () => {
    const state = {
      ...initialState,
      renewalTokenUserRequest: true,
      renewalTokenUserFailed: false
    }
    expect(userReducer(initialState, { type: RENEWAL_TOKEN_REQUEST })).toEqual(state)
  });

  it('should handle RENEWAL_TOKEN_SUCCESS', () => {
    const state = {
      ...initialState,
      renewalTokenUserFailed: false,
      renewalTokenUserRequest: false
    }
    expect(userReducer(initialState, { type: RENEWAL_TOKEN_SUCCESS })).toEqual(state)
  });
 
  it('should handle RENEWAL_TOKEN_ERROR', () => {
    const state = {
      ...initialState,
      renewalTokenUserFailed: true,
      renewalTokenUserRequest: false
    }
    expect(userReducer(initialState, { type: RENEWAL_TOKEN_ERROR })).toEqual(state)
  });

  it('should handle RENEWAL_INFO_USER_REQUEST', () => {
    const state = {
      ...initialState,
      renewalInfoUserRequest: true,
      renewalInfoUserFailed: false
    }
    expect(userReducer(initialState, { type: RENEWAL_INFO_USER_REQUEST })).toEqual(state)
  });

  it('should handle RENEWAL_INFO_USER_SUCCESS', () => {
    const testRenewalUserInfo = {
      email: 'testEmail@ya.ru',
      name: 'testName'
    };
    const state = {
      ...initialState,
      userInfo: testRenewalUserInfo,
      renewalInfoUserFailed: false,
      renewalInfoUserRequest: false
    }
    expect(userReducer(initialState, { type: RENEWAL_INFO_USER_SUCCESS, payload: testRenewalUserInfo })).toEqual(state)
  });
 
  it('should handle RENEWAL_INFO_USER_ERROR', () => {
    const state = {
      ...initialState,
      renewalInfoUserFailed: true,
      renewalInfoUserRequest: false
    }
    expect(userReducer(initialState, { type: RENEWAL_INFO_USER_ERROR })).toEqual(state)
  });

  it('should handle UPDATE_INFO_USER_REQUEST', () => {
    const state = {
      ...initialState,
      updateInfoUserRequest: true,
      updateInfoUserFailed: false
    }
    expect(userReducer(initialState, { type: UPDATE_INFO_USER_REQUEST })).toEqual(state)
  });

  it('should handle UPDATE_INFO_USER_SUCCESS', () => {
    const testUpdateUserInfo = {
      email: 'testEmail@ya.ru',
      name: 'testName'
    };
    const state = {
      ...initialState,
      userInfo: testUpdateUserInfo,
      updateInfoUserFailed: false,
      updateInfoUserRequest: false
    }
    expect(userReducer(initialState, { type: UPDATE_INFO_USER_SUCCESS, payload: testUpdateUserInfo })).toEqual(state)
  });
 
  it('should handle UPDATE_INFO_USER_ERROR', () => {
    const state = {
      ...initialState,
      updateInfoUserFailed: true,
      updateInfoUserRequest: false
    }
    expect(userReducer(initialState, { type: UPDATE_INFO_USER_ERROR })).toEqual(state)
  });

})
