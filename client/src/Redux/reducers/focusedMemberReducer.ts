import { focusedMemberActionType } from "../action-types/focusedMemberActionType";
import { Action } from "../actions/focusedMemberAction";

const initialState = {username: ''}

const focusedMemberReducer = (state: any = initialState, action: Action) => {
    switch(action.type){
        case focusedMemberActionType.UPDATE:
            return action.payload;
        default: 
            return state; 
    }
}

export default focusedMemberReducer
