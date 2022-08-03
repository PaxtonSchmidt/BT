import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import focusedTicketReducer from '../reducers/index';

export const focusedTicketStore = createStore(
  focusedTicketReducer,
  { focusedTicket: {} },
  applyMiddleware(thunk)
);
