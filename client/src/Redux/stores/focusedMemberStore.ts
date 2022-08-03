import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import focusedMemberReducer from '../reducers/focusedMemberReducer';

export const focusedMemberStore = createStore(
  focusedMemberReducer,
  { focusedMember: {} },
  applyMiddleware(thunk)
);
