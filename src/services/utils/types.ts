import store from '../burger-store';
import { rootReducer } from '../reducers';

export type TIngredientType = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  id: string;
};

export type TDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

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

export interface IPersonInfoUser {
  email: string;
  name: string;
}

export interface IUpdateInfoUserParams {
  email?: string;
  password?: string;
  name?: string;
}

export type TRedirect = {
  onSuccess: () => void
}