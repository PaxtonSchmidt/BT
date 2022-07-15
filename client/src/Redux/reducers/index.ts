import { combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import focusedMemberReducer from './focusedMemberReducer';
import focusedProjectReducer from './focusedProjectReducer';
import focusedTeammateReducer from './focusedTeammateReducer';
import focusedTicketReducer from './focusedTicketReducer';
import invitesReducer from './invitesReducers';
import loginReducer from './loginReducers'
import sessionReducer from './sessionReducer';
import teammatesReducer from './teammatesReducer';
import teamsReducer from './teamsReducer';

const reducers = combineReducers({
    login: loginReducer,
    invites: invitesReducer,
    currentUser: currentUserReducer, 
    session: sessionReducer,
    teams: teamsReducer,
    focusedTicket: focusedTicketReducer,
    focusedProject: focusedProjectReducer,
    focusedMember: focusedMemberReducer,
    focusedTeammate: focusedTeammateReducer,
    teammates: teammatesReducer
})

export default reducers

export type State = ReturnType<typeof reducers>