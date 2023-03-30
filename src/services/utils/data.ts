import { setCookie, getCookie } from './cookie';
import { 
  ICreateNewPasswordUserParams,
  IRegistrationInfoUserParams,
  IAuthenticationUserParams,
  IUpdateInfoUserParams,
  TResponse,
  IResponseBody,
  IGetBurgerIngredientsResponse,
  IGetBurgerOrderResponse,
  IPostOrderResponse,
  IUserResponse,
  IPersonUserResponse,
  ITokenResponse
} from '../types/types-api';

const API_URL: string =  'https://norma.nomoreparties.space/api';

export const WS_ORDERS_PERSON_URL: string = 'wss://norma.nomoreparties.space/orders'; 
export const WS_ORDERS_FEED_URL: string = 'wss://norma.nomoreparties.space/orders/all';

function validateResponse<T>(result: TResponse<T>): Promise<T> | Promise<never> { 
  return (result.ok) 
    ? result.json() 
    : result.json().then((error) => Promise.reject(error));
};

function request<T>(url: string, options: RequestInit): Promise<T> {
  return fetch(url, options).then(validateResponse)
};

function secondRequstCaseOfExpired<T>(url: string, options: RequestInit): Promise<T> {
  return fetch(url, options)
  .then(validateResponse)
  .catch(error => {
    if (error.message === 'jwt expired') {
      return postApiRenewalTokenUser()
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

            const reqHeaders = new Headers(options.headers);
            reqHeaders.set('Authorization', 'Bearer ' + authToken);
            options.headers = reqHeaders;
            return request<T>(url, options);
          }
        })
    }
  })
};

export const getApiBurgerIngredients = (): Promise<IGetBurgerIngredientsResponse> => {
  return request<IGetBurgerIngredientsResponse>(`${API_URL}/ingredients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => {
      if (data?.success) {
        return data;
      }
      return Promise.reject(data);
    })
};

export const postApiBurgerOrder = (itemsId: Array<string>): Promise<IPostOrderResponse> => {
  return secondRequstCaseOfExpired<IPostOrderResponse>(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({"ingredients": itemsId})
    })
};

export const postApiPasswordReset = (infoEmail: string): Promise<IUserResponse> => {
  return request<IUserResponse>(`${API_URL}/password-reset`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email": infoEmail})
    })
};

export const postApiPasswordCreateNew = (infoPassword: ICreateNewPasswordUserParams): Promise<IUserResponse> => {
  return request<IUserResponse>(`${API_URL}/password-reset/reset`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoPassword)
    })
};

export const postApiRegistrationUserNew = (infoUser: IRegistrationInfoUserParams): Promise<ITokenResponse> => {
  return request<ITokenResponse>(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoUser)
    })
};

export const postApiAuthenticationUser = (infoUser: IAuthenticationUserParams): Promise<ITokenResponse> => {
  return request<ITokenResponse>(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoUser)
    })
};

export const postApiLogoutUser = (): Promise<IResponseBody> => {
  return request<IResponseBody>(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
};

export const postApiRenewalTokenUser = (): Promise<ITokenResponse> => {
  return request<ITokenResponse>(`${API_URL}/auth/token`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
};

export const getApiInfoUser = (): Promise<IPersonUserResponse> => {
  return secondRequstCaseOfExpired<IPersonUserResponse>(`${API_URL}/auth/user`, {
      method: "GET",
      credentials: "same-origin",
      cache: "no-cache",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie('accessToken')
      },
      referrerPolicy: 'no-referrer',
      redirect: 'follow'
    })
    .then(data => {
      if (data?.success) {
        return data;
      }
      return Promise.reject(data);
    })
};

export const patchApiUpdateInfoUser = (infoUser: IUpdateInfoUserParams): Promise<IPersonUserResponse> => {
  return secondRequstCaseOfExpired<IPersonUserResponse>(`${API_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify(infoUser)
    })
};

export const getApiBurgerOrderInfo = (numberOrder: string | undefined): Promise<IGetBurgerOrderResponse> => {
  return request<IGetBurgerOrderResponse>(`${API_URL}/orders/${numberOrder}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => {
      if (data?.success) {
        return data;
      }
      return Promise.reject(data);
    })
};
