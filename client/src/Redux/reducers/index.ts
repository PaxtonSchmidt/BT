import { combineReducers } from 'redux';
import loginReducer from './loginReducers'

const reducers = combineReducers({
    login: loginReducer,
    // projects: projectsReducer
})

export default reducers

export type State = ReturnType<typeof reducers>