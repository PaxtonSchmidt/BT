import { sessionActionType } from '../action-types/sessionActionType';
import { Action } from '../actions/sessionAction';
import { Session } from '../interfaces/session'

const initialState = {session: {}}; 

const sessionReducer = (state: any = initialState, action: Action) => {
    switch(action.type){
        case sessionActionType.UPDATE:
            return state + action.payload;
        default: 
            return state; 
    }
}

export default sessionReducer
