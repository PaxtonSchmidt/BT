import { focusedProjectActionType } from "../action-types/focusedProjectActionType";
import { Action } from "../actions/focusedProjectAction";

const initialState = {name: 'All'}

const focusedProjectReducer = (state: any = initialState, action: Action) => {
    switch(action.type){
        case focusedProjectActionType.UPDATE:
            return action.payload;
        default: 
            return state; 
    }
}

export default focusedProjectReducer
