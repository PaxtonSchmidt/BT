import { combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import invitesReducer from './invitesReducers';
import loginReducer from './loginReducers'
import sessionReducer from './sessionReducer';

const reducers = combineReducers({
    login: loginReducer,
    invites: invitesReducer,
    currentUser: currentUserReducer, 
    session: sessionReducer
})

export default reducers

export type State = ReturnType<typeof reducers>