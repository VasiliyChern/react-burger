import { setCookie, getCookie } from './cookie';
import { 
  ICreateNewPasswordUserParams,
  IRegistrationInfoUserParams,
  IAuthenticationUserParams,
  IUpdateInfoUserParams
} from './types';

const apiUrl =  'https://norma.nomoreparties.space/api';

const validateResponse = (result: Response) => {
  return (result.ok) 
    ? result.json() 
    : result.json().then((error) => Promise.reject(error));
};

function request(url: string, options: RequestInit) {
    return fetch(url, options).then(validateResponse)
};

function secondRequstCaseOfExpired(url: string, options: RequestInit) {
  return request(url, options)
  .catch (error => {
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
            return request(url, options);
          }
        })
    }
  })
};

export const getApiBurgerIngredients = () => {
  return request(`${apiUrl}/ingredients`, {
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

export const postApiBurgerOrder = (itemsId: Array<string>) => {
  return secondRequstCaseOfExpired(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({"ingredients": itemsId})
    })
};

export const postApiPasswordReset = (infoEmail: string) => {
  return request(`${apiUrl}/password-reset`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email": infoEmail})
    })
};

export const postApiPasswordCreateNew = (infoPassword: ICreateNewPasswordUserParams) => {
  return request(`${apiUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoPassword)
    })
};

export const postApiRegistrationUserNew = (infoUser: IRegistrationInfoUserParams) => {
  return request(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoUser)
    })
};

export const postApiAuthenticationUser = (infoUser: IAuthenticationUserParams) => {
  return request(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoUser)
    })
};

export const postApiLogoutUser = () => {
  return request(`${apiUrl}/auth/logout`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
};

export const postApiRenewalTokenUser = () => {
  return request(`${apiUrl}/auth/token`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
};

export const getApiInfoUser = () => {
  return secondRequstCaseOfExpired(`${apiUrl}/auth/user`, {
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

export const patchApiUpdateInfoUser = (infoUser: IUpdateInfoUserParams) => {
  return secondRequstCaseOfExpired(`${apiUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify(infoUser)
    })
};
