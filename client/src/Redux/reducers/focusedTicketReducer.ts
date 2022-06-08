import { focusedTicketActionType } from "../action-types/focusedTicketActionType";
import { Action } from "../actions/focusedTicketAction";

const initialState = {ticket: {}}; 

const focusedTicketReducer = (state: any = initialState, action: Action) => {
    switch(action.type){
        case focusedTicketActionType.UPDATE:
            return action.payload;
        default: 
            return state; 
    }
}

export default focusedTicketReducer
