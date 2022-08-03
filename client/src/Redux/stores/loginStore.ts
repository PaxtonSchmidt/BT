import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import loginReducers from '../reducers/index';

export const loginStore = createStore(
  loginReducers,
  {},
  applyMiddleware(thunk)
);
