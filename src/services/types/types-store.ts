import store from '../burger-store';
import { rootReducer } from '../reducers';

export type TDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
