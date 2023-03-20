import {combineReducers} from 'redux';
import {offerReducer} from './offer';
import {selectionReducer} from './selection';
import {ingredientCharacteristicReducer} from './ingredient-characteristic'; 
import {orderReducer} from './order';
import {userReducer} from './user';
import {wsReducer} from './ws';
import {wsPersonReducer} from './ws-person';

export const rootReducer = combineReducers({
  offerIngredients: offerReducer,
  selectionIngredients: selectionReducer,
  characteristicIngredient: ingredientCharacteristicReducer,
  order: orderReducer,
  user: userReducer,
  ws: wsReducer,
  wsPerson: wsPersonReducer
});