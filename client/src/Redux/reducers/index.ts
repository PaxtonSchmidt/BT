import { combineReducers } from 'redux';
import invitesReducer from './invitesReducers';
import loginReducer from './loginReducers'

const reducers = combineReducers({
    login: loginReducer,
    invites: invitesReducer
    // projects: projectsReducer
})

export default reducers

export type State = ReturnType<typeof reducers>