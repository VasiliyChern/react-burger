import {combineReducers} from 'redux';
import {offerReducer} from './offer';
import {selectionReducer} from './selection';
import {ingredientCharacteristicReducer} from './ingredient-characteristic'; 
import {orderReducer} from './order';
import {userReducer} from './user';

export const rootReducer = combineReducers({
  offerIngredients: offerReducer,
  selectionIngredients: selectionReducer,
  characteristicIngredient: ingredientCharacteristicReducer,
  order: orderReducer,
  user: userReducer
});