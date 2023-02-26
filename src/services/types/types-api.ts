import { TIngredientType } from './types-burger';

export interface ICreateNewPasswordUserParams {
  password: string;
  token: string;
}

export interface IRegistrationInfoUserParams {
  email: string;
  password: string;
  name: string;
}

export interface IAuthenticationUserParams {
  email: string;
  password: string;
}

export interface IUpdateInfoUserParams {
  email?: string;
  password?: string;
  name?: string;
}

export type TRedirect = {
  onSuccess: () => void
}

export interface IPersonInfoUser {
  email: string;
  name: string;
}

export interface TResponse<T> extends Response {
  json(): Promise<T>
}

export interface IResponseBody {
  success: boolean
}

export interface IGetBurgerIngredientsResponse extends IResponseBody {
  data: Array<TIngredientType>
}

export interface IPostOrderResponse extends IResponseBody {
  order: {
    number: number
  }
}
export interface IUserResponse extends IResponseBody {
  message: string
}

export interface IPersonUserResponse extends IResponseBody {
  user: IPersonInfoUser;
}

export interface ITokenResponse extends IResponseBody {
  accessToken: string;
  refreshToken: string;
  user: IPersonInfoUser;
}