import { invitesActionType } from "../action-types/invitesActionTypes";
import { Action } from "../actions/invitesActions";
import { Invites } from "../interfaces/invites";

const initialState = {invites: []}; 

const invitesReducer = (state: any = initialState, action: Action) => {
    switch(action.type){
        case invitesActionType.UPDATE:
            return action.payload;
        case invitesActionType.REMOVE: 
            return state.filter((invite: any) => invite.invite_id !== action.payload)
        default: 
            return state; 
    }
}

export default invitesReducer
