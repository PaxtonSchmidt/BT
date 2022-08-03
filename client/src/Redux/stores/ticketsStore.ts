import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import ticketsReducer from '../reducers/ticketsReducer';

export const ticketsStore = createStore(
  ticketsReducer,
  { tickets: [] },
  applyMiddleware(thunk)
);
