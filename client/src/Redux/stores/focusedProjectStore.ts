import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import focusedProjectReducer from '../reducers/focusedProjectReducer';

export const focusedProjectStore = createStore(
  focusedProjectReducer,
  { focusedProject: {} },
  applyMiddleware(thunk)
);
