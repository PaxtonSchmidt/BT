import { invitesActionType } from "../action-types/invitesActionTypes";
import { Action } from "../actions/invitesActions";
import { Invites } from "../interfaces/invites";

const initialState = {invites: []}; 

const invitesReducer = (state: Invites = initialState, action: Action) => {
    switch(action.type){
        case invitesActionType.UPDATE:
            return action.payload;
        case invitesActionType.REMOVE: 
            // return state - action.payload;
        default: 
            return state; 
    }
}

export default invitesReducer
