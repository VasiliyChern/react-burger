import { 
  postApiPasswordReset,
  postApiPasswordCreateNew,
  postApiRegistrationUserNew,
  postApiAuthenticationUser,
  postApiLogoutUser,
  postApiRenewalTokenUser,
  getApiInfoUser,
  patchApiUpdateInfoUser
} from '../utils/data';
import { setCookie, getCookie, deleteCookie } from '../utils/cookie';
import { TDispatch,
  IAuthenticationUserParams,
  ICreateNewPasswordUserParams,
  IRegistrationInfoUserParams,
  IUpdateInfoUserParams,
  TRedirect  
} from '../utils/types';

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR';

export const PASSWORD_CREATE_NEW_REQUEST = 'PASSWORD_CREATE_NEW_REQUEST';
export const PASSWORD_CREATE_NEW_SUCCESS = 'PASSWORD_CREATE_NEW_SUCCESS';
export const PASSWORD_CREATE_NEW_ERROR = 'PASSWORD_CREATE_NEW_ERROR';

export const REGISTRATION_USER_REQUEST = 'REGISTRATION_USER_REQUEST';
export const REGISTRATION_USER_SUCCESS = 'REGISTRATION_USER_SUCCESS';
export const REGISTRATION_USER_ERROR = 'REGISTRATION_USER_ERROR';

export const AUTHENTICATION_USER_REQUEST = 'AUTHENTICATION_USER_REQUEST';
export const AUTHENTICATION_USER_SUCCESS = 'AUTHENTICATION_USER_SUCCESS';
export const AUTHENTICATION_USER_ERROR = 'AUTHENTICATION_USER_ERROR';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';

export const RENEWAL_TOKEN_REQUEST = 'RENEWAL_TOKEN_REQUEST';
export const RENEWAL_TOKEN_SUCCESS = 'RENEWAL_TOKEN_SUCCESS';
export const RENEWAL_TOKEN_ERROR = 'RENEWAL_TOKEN_ERROR';

export const RENEWAL_INFO_USER_REQUEST = 'RENEWAL_INFO_USER_REQUEST';
export const RENEWAL_INFO_USER_SUCCESS = 'RENEWAL_INFO_USER_SUCCESS';
export const RENEWAL_INFO_USER_ERROR = 'RENEWAL_INFO_USER_ERROR';

export const UPDATE_INFO_USER_REQUEST = 'UPDATE_INFO_USER_REQUEST';
export const UPDATE_INFO_USER_SUCCESS = 'UPDATE_INFO_USER_SUCCESS';
export const UPDATE_INFO_USER_ERROR = 'UPDATE_INFO_USER_ERROR';

export function resetPassword(infoEmail: string) {
  return function (dispatch: TDispatch) {
    dispatch({
      type: PASSWORD_RESET_REQUEST
    })
    postApiPasswordReset(infoEmail)
      .then(result => {
        if (result && result.success) {
          dispatch({
            type: PASSWORD_RESET_SUCCESS,
            payload: result.message
          })
        } else {
          dispatch({
            type: PASSWORD_RESET_ERROR
          })
        }
      })
      .catch(error => {
        dispatch({
          type: PASSWORD_RESET_ERROR
        })
      })
  }
}

export function createNewPassword(infoPassword: ICreateNewPasswordUserParams) {
  return function (dispatch: TDispatch) {
    dispatch({
      type: PASSWORD_CREATE_NEW_REQUEST
    })
    postApiPasswordCreateNew(infoPassword)
      .then(result => {
        if (result && result.success) {
          dispatch({
            type: PASSWORD_CREATE_NEW_SUCCESS,
            payload: result.message
          })
        } else {
          dispatch({
            type: PASSWORD_CREATE_NEW_ERROR
          })
        }
      })
      .catch(error => {
        dispatch({
          type: PASSWORD_CREATE_NEW_ERROR
        })
      })
  }
}

export function registrationUser(infoUser: IRegistrationInfoUserParams, toRedirect: TRedirect) {
  return function (dispatch: TDispatch) {
    dispatch({
      type: REGISTRATION_USER_REQUEST
    })
    postApiRegistrationUserNew(infoUser)
      .then(result => {
        if (result && result.success) {
          let authToken;
          if (result.accessToken.indexOf('Bearer') === 0) {
            authToken = result.accessToken.split('Bearer ')[1];
          }
          else {
            authToken = result.accessToken;
          }
          setCookie('accessToken', authToken);

          localStorage.setItem('refreshToken', result.refreshToken);

          dispatch({
            type: REGISTRATION_USER_SUCCESS,
            payload: result.user
          })
        } else {
          dispatch({
            type: REGISTRATION_USER_ERROR
          })
        }
      })
      .then( () => {
        toRedirect.onSuccess();
      })
      .catch(error => {
        dispatch({
          type: REGISTRATION_USER_ERROR
        })
      })
  }
}

export function authenticationUser(infoUser: IAuthenticationUserParams) {
  return function (dispatch: TDispatch) {
    dispatch({
      type: AUTHENTICATION_USER_REQUEST
    })
    postApiAuthenticationUser(infoUser)
      .then(result => {
        if (result && result.success) {
          let authToken;
          if (result.accessToken.indexOf('Bearer') === 0) {
            authToken = result.accessToken.split('Bearer ')[1];
          }
          else {
            authToken = result.accessToken;
          }
          setCookie('accessToken', authToken);

          localStorage.setItem('refreshToken', result.refreshToken);

          dispatch({
            type: AUTHENTICATION_USER_SUCCESS,
            payload: result.user,
          })
        } else {
          dispatch({
            type: AUTHENTICATION_USER_ERROR
          })
        }
      })
      .catch(error => {
        dispatch({
          type: AUTHENTICATION_USER_ERROR
        })
      })
  }
}

export function logoutUser(toRedirect: TRedirect) {
  return function (dispatch: TDispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST
    })
    postApiLogoutUser()
      .then(result => {
        if (result && result.success) {
          localStorage.clear();
          deleteCookie('accessToken');
          dispatch({
            type: LOGOUT_USER_SUCCESS,
          });
        } else {
          dispatch({
            type: LOGOUT_USER_ERROR
          })
        }
      })
      .then( () => {
        toRedirect.onSuccess();
      })
      .catch(error => {
        dispatch({
          type: LOGOUT_USER_ERROR
        })
      })
  }
}

export function renewalTokenUser() {
  return function (dispatch: TDispatch) {
    dispatch({
      type: RENEWAL_TOKEN_REQUEST
    })
    postApiRenewalTokenUser()
      .then(result => {
        if (result && result.success) {
          let authToken;
          if (result.accessToken.indexOf('Bearer') === 0) {
            authToken = result.accessToken.split('Bearer ')[1];
          }
          else {
            authToken = result.accessToken;
          }
          setCookie('accessToken', authToken);

          dispatch({
            type: RENEWAL_TOKEN_SUCCESS
          })
        } else {
          dispatch({
            type: RENEWAL_TOKEN_ERROR
          })
        }
      })
      .catch(error => {
        dispatch({
          type: RENEWAL_TOKEN_ERROR
        })
      })
  }
}

export function renewalInfoUser() {
  return function (dispatch: TDispatch) {
    dispatch({
      type: RENEWAL_INFO_USER_REQUEST
    })
    getApiInfoUser()
      .then(result => {
        if (result && result.success) {
          dispatch({
            type: RENEWAL_INFO_USER_SUCCESS,
            payload: result.user
          })
        } else {
          dispatch({
            type: RENEWAL_INFO_USER_ERROR
          })
        }
      })
      .catch(error => {
        dispatch({
          type: RENEWAL_INFO_USER_ERROR
        })
      })
  }
}

export function updateInfoUser(infoUser: IUpdateInfoUserParams) {
  return function (dispatch: TDispatch) {
    dispatch({
      type: UPDATE_INFO_USER_REQUEST
    })
    patchApiUpdateInfoUser(infoUser)
      .then(result => {
        if (result && result.success) {
          dispatch({
            type: UPDATE_INFO_USER_SUCCESS,
            payload: result.user,
          })
        } else {
          dispatch({
            type: UPDATE_INFO_USER_ERROR
          })
        }
      })
      .catch(error => {
        dispatch({
          type: UPDATE_INFO_USER_ERROR
        })
      })
  }
}

export function haveUserAccess() {
  let accessCookie = getCookie('accessToken');
  return accessCookie !== null && accessCookie !== undefined && accessCookie !== '';
}