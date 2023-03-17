import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import {rootReducer} from '../reducers/index';
import { TIngredientCharacteristicActions } from '../actions/ingredient-characteristic';
import { TGetIngredientsApiActions } from '../actions/offer';
import { TOrderActions } from '../actions/order';
import { TSelectionIngredientActions } from '../actions/selection';
import { TUserActions } from '../actions/user';
import { TWsActions } from '../actions/ws';

export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions = 
  | TIngredientCharacteristicActions
  | TGetIngredientsApiActions
  | TOrderActions
  | TSelectionIngredientActions
  | TUserActions
  | TWsActions;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, Action, TApplicationActions>
>;

