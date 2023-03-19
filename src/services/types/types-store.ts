import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import {rootReducer} from '../reducers/index';
import { TIngredientCharacteristicActions } from '../actions/ingredient-characteristic';
import { TGetIngredientsApiActions } from '../actions/offer';
import { TOrderActions } from '../actions/order';
import { TSelectionIngredientActions } from '../actions/selection';
import { TUserActions } from '../actions/user';
import { TWsActions } from '../actions/ws';
import { TWsPersonActions } from '../actions/ws-person';
import { TwsConnectionActionTypes } from './types-ws';
import { TwsPersonActionTypes } from './types-ws-person';

export type TwsActionTypes = TwsConnectionActionTypes | TwsPersonActionTypes;

export type TRootState = ReturnType<typeof rootReducer>;

type TApplicationActions = 
  | TIngredientCharacteristicActions
  | TGetIngredientsApiActions
  | TOrderActions
  | TSelectionIngredientActions
  | TUserActions
  | TWsActions
  | TWsPersonActions;

export type AppDispatch = ThunkDispatch<TRootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, TRootState, Action, TApplicationActions>
>;

