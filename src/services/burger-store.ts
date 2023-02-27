import thunk from 'redux-thunk';
import {rootReducer} from './reducers/index';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true
});

export default store;