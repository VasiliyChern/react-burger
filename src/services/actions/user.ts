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
import {
  ICreateNewPasswordUserParams,
  IRegistrationInfoUserParams,
  IAuthenticationUserParams,
  IUpdateInfoUserParams,
  TRedirect,
  IPersonInfoUser
} from '../types/types-api';
import { AppDispatch } from '../types/types-store';
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

export interface IPasswordResetRequestAction {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}
export interface IPasswordResetSuccessAction {
  readonly type: typeof PASSWORD_RESET_SUCCESS;
  readonly payload: string;
}
export interface IPasswordResetErrorAction {
  readonly type: typeof PASSWORD_RESET_ERROR;
}

export interface IPasswordCreateNewRequestAction {
  readonly type: typeof PASSWORD_CREATE_NEW_REQUEST;
}
export interface IPasswordCreateNewSuccessAction {
  readonly type: typeof PASSWORD_CREATE_NEW_SUCCESS;
  readonly payload: string;
}
export interface IPasswordCreateNewErrorAction {
  readonly type: typeof PASSWORD_CREATE_NEW_ERROR;
}

export interface IRegistrationUserRequestAction {
  readonly type: typeof REGISTRATION_USER_REQUEST;
}
export interface IRegistrationUserSuccessAction {
  readonly type: typeof REGISTRATION_USER_SUCCESS;
  readonly payload: IPersonInfoUser;
}
export interface IRegistrationUserErrorAction {
  readonly type: typeof REGISTRATION_USER_ERROR;
}

export interface IAuthenticationUserRequestAction {
  readonly type: typeof AUTHENTICATION_USER_REQUEST;
}
export interface IAuthenticationUserSuccessAction {
  readonly type: typeof AUTHENTICATION_USER_SUCCESS;
  readonly payload: IPersonInfoUser;
}
export interface IAuthenticationUserErrorAction {
  readonly type: typeof AUTHENTICATION_USER_ERROR;
}

export interface ILogoutUserRequestAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}
export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}
export interface ILogoutUserErrorAction {
  readonly type: typeof LOGOUT_USER_ERROR;
}

export interface IRenewalTokenRequestAction {
  readonly type: typeof RENEWAL_TOKEN_REQUEST;
}
export interface IRenewalTokenSuccessAction {
  readonly type: typeof RENEWAL_TOKEN_SUCCESS;
}
export interface IRenewalTokenErrorAction {
  readonly type: typeof RENEWAL_TOKEN_ERROR;
}

export interface IRenewalInfoUserRequestAction {
  readonly type: typeof RENEWAL_INFO_USER_REQUEST;
}
export interface IRenewalInfoUserSuccessAction {
  readonly type: typeof RENEWAL_INFO_USER_SUCCESS;
  readonly payload: IPersonInfoUser;
}
export interface IRenewalInfoUserErrorAction {
  readonly type: typeof RENEWAL_INFO_USER_ERROR;
}

export interface IUpdateInfoUserRequestAction {
  readonly type: typeof UPDATE_INFO_USER_REQUEST;
}
export interface IUpdateInfoUserSuccessAction {
  readonly type: typeof UPDATE_INFO_USER_SUCCESS;
  readonly payload: IPersonInfoUser;
}
export interface IUpdateInfoUserErrorAction {
  readonly type: typeof UPDATE_INFO_USER_ERROR;
}

export type TUserActions = 
  | IPasswordResetRequestAction
  | IPasswordResetSuccessAction
  | IPasswordResetErrorAction
  | IPasswordCreateNewRequestAction
  | IPasswordCreateNewSuccessAction
  | IPasswordCreateNewErrorAction
  | IRegistrationUserRequestAction
  | IRegistrationUserSuccessAction
  | IRegistrationUserErrorAction
  | IAuthenticationUserRequestAction
  | IAuthenticationUserSuccessAction
  | IAuthenticationUserErrorAction
  | ILogoutUserRequestAction
  | ILogoutUserSuccessAction
  | ILogoutUserErrorAction
  | IRenewalTokenRequestAction
  | IRenewalTokenSuccessAction
  | IRenewalTokenErrorAction
  | IRenewalInfoUserRequestAction
  | IRenewalInfoUserSuccessAction
  | IRenewalInfoUserErrorAction
  | IUpdateInfoUserRequestAction
  | IUpdateInfoUserSuccessAction
  | IUpdateInfoUserErrorAction

export const resetPassword = (infoEmail: string) => (dispatch: AppDispatch) => {
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
};

export const createNewPassword = (infoPassword: ICreateNewPasswordUserParams) => (dispatch: AppDispatch) => {
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
};

export const registrationUser = (infoUser: IRegistrationInfoUserParams, toRedirect: TRedirect) => (dispatch: AppDispatch) => {
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
};

export const authenticationUser = (infoUser: IAuthenticationUserParams) => (dispatch: AppDispatch) => {
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
};

export const logoutUser = (toRedirect: TRedirect) => (dispatch: AppDispatch) => {
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
};

export const renewalTokenUser = () => (dispatch: AppDispatch) => {
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
};

export const renewalInfoUser = () => (dispatch: AppDispatch) => {
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
};

export const updateInfoUser = (infoUser: IUpdateInfoUserParams) => (dispatch: AppDispatch) => {
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
};

export function haveUserAccess(): boolean {
  let accessCookie = getCookie('accessToken');
  return accessCookie !== null && accessCookie !== undefined && accessCookie !== '';
}