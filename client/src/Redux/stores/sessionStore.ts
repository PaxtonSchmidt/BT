import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from '../reducers/index';

export const sessionStore = createStore(
  sessionReducer,
  { session: {} },
  applyMiddleware(thunk)
);
