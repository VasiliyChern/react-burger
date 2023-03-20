import { TRootState } from '../types/types-store';

export const ingredients = (state: TRootState) => state.offerIngredients.ingredients;
export const ingredientsRequest = (state: TRootState) => state.offerIngredients.ingredientsRequest;
export const ingredientsFailed = (state: TRootState) => state.offerIngredients.ingredientsFailed;

export const burgerBun = (state: TRootState) => state.selectionIngredients.burgerBun;
export const filling = (state: TRootState) => state.selectionIngredients.filling;

export const order = (state: TRootState) => state.order.order;
export const orderRequest = (state: TRootState) => state.order.orderRequest;

export const orderInformation = (state: TRootState) => state.order.orderInformation;

export const userInfo = (state: TRootState) => state.user.userInfo;
export const updateInfoUserRequest = (state: TRootState) => state.user.updateInfoUserRequest;
export const passwordInfo = (state: TRootState) => state.user.passwordInfo;
export const passwordNewInfo = (state: TRootState) => state.user.passwordNewInfo;

export const authenticationUserRequest = (state: TRootState) => state.user.authenticationUserRequest;
export const authenticationUserFailed = (state: TRootState) => state.user.authenticationUserFailed;
export const registrationUserRequest = (state: TRootState) => state.user.registrationUserRequest;

export const orders = (state: TRootState) => state.ws.orders;
export const total = (state: TRootState) => state.ws.total;
export const totalToday = (state: TRootState) => state.ws.totalToday;

export const personOrders = (state: TRootState) => state.wsPerson.personOrders;
