import { IPersonInfoUser } from '../types/types-api'; 
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
} from '../actions/user';

interface IUser {
  passwordResetRequest: boolean;
  passwordResetFailed: boolean;
  passwordInfo: string | null;

  passwordCreateNewRequest: boolean;
  passwordCreateNewFailed: boolean;
  passwordNewInfo: string | null;

  registrationUserRequest: boolean;
  registrationUserFailed: boolean;
  userInfo: IPersonInfoUser | null;

  authenticationUserRequest: boolean;
  authenticationUserFailed: boolean;

  logoutUserRequest: boolean;
  logoutUserFailed: boolean;

  renewalTokenUserRequest: boolean;
  renewalTokenUserFailed: boolean;

  renewalInfoUserRequest: boolean;
  renewalInfoUserFailed: boolean;

  updateInfoUserRequest: boolean;
  updateInfoUserFailed: boolean;
} 

const initialState: IUser = {
  passwordResetRequest: false,
  passwordResetFailed: false,
  passwordInfo: null,

  passwordCreateNewRequest: false,
  passwordCreateNewFailed: false,
  passwordNewInfo: null,

  registrationUserRequest: false,
  registrationUserFailed: false,
  userInfo: null,
  
  authenticationUserRequest: false,
  authenticationUserFailed: false,
  
  logoutUserRequest: false,
  logoutUserFailed: false,
  
  renewalTokenUserRequest: false,
  renewalTokenUserFailed: false,
  
  renewalInfoUserRequest: false,
  renewalInfoUserFailed: false,
  
  updateInfoUserRequest: false,
  updateInfoUserFailed: false
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
        passwordResetFailed: false
      };
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordInfo: action.payload,
        passwordResetFailed: false,
        passwordResetRequest: false
      };
    }
    case PASSWORD_RESET_ERROR: {
      return {
        ...state,
        passwordInfo: null,
        passwordResetFailed: true,
        passwordResetRequest: false
      };
    }
    case PASSWORD_CREATE_NEW_REQUEST: {
      return {
        ...state,
        passwordCreateNewRequest: true,
        passwordCreateNewFailed: false
      };
    }
    case PASSWORD_CREATE_NEW_SUCCESS: {
      return {
        ...state,
        passwordNewInfo: action.payload,
        passwordCreateNewFailed: false,
        passwordCreateNewRequest: false
      };
    }
    case PASSWORD_CREATE_NEW_ERROR: {
      return {
        ...state,
        passwordNewInfo: null,
        passwordCreateNewFailed: true,
        passwordCreateNewRequest: false
      };
    }
    case REGISTRATION_USER_REQUEST: {
      return {
        ...state,
        registrationUserRequest: true,
        registrationUserFailed: false
      };
    }
    case REGISTRATION_USER_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload, 
        registrationUserFailed: false,
        registrationUserRequest: false
      };
    }
    case REGISTRATION_USER_ERROR: {
      return {
        ...state,
        registrationUserFailed: true,
        registrationUserRequest: false
      };
    }
    case AUTHENTICATION_USER_REQUEST: {
      return {
        ...state,
        authenticationUserRequest: true,
        authenticationUserFailed: false
      };
    }
    case AUTHENTICATION_USER_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        authenticationUserFailed: false,
        authenticationUserRequest: false
      };
    }
    case AUTHENTICATION_USER_ERROR: {
      return {
        ...state,
        authenticationUserFailed: true,
        authenticationUserRequest: false
      };
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        logoutUserRequest: true,
        logoutUserFailed: false
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        userInfo: null,
        logoutUserFailed: false,
        logoutUserRequest: false
      };
    }
    case LOGOUT_USER_ERROR: {
      return {
        ...state,
        logoutUserFailed: true,
        logoutUserRequest: false
      };
    }
    case RENEWAL_TOKEN_REQUEST: {
      return {
        ...state,
        renewalTokenUserRequest: true,
        renewalTokenUserFailed: false
      };
    }
    case RENEWAL_TOKEN_SUCCESS: {
      return {
        ...state,
        renewalTokenUserFailed: false,
        renewalTokenUserRequest: false
      };
    }
    case RENEWAL_TOKEN_ERROR: {
      return {
        ...state,
        renewalTokenUserFailed: true,
        renewalTokenUserRequest: false
      };
    }
    case RENEWAL_INFO_USER_REQUEST: {
      return {
        ...state,
        renewalInfoUserRequest: true,
        renewalInfoUserFailed: false
      };
    }
    case RENEWAL_INFO_USER_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        renewalInfoUserFailed: false,
        renewalInfoUserRequest: false
      };
    }
    case RENEWAL_INFO_USER_ERROR: {
      return {
        ...state,
        renewalInfoUserFailed: true,
        renewalInfoUserRequest: false
      };
    }
    case UPDATE_INFO_USER_REQUEST: {
      return {
        ...state,
        updateInfoUserRequest: true,
        updateInfoUserFailed: false
      };
    }
    case UPDATE_INFO_USER_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        updateInfoUserFailed: false,
        updateInfoUserRequest: false
      };
    }
    case UPDATE_INFO_USER_ERROR: {
      return {
        ...state,
        updateInfoUserFailed: true,
        updateInfoUserRequest: false
      };
    }

    default: {
      return state
    }
  }
}