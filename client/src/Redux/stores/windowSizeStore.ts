import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import windowSizeReducer from '../reducers/windowSizeReducer';

export const windowSizeStore = createStore(
  windowSizeReducer,
  {},
  applyMiddleware(thunk)
);
