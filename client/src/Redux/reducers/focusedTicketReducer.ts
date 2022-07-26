import { focusedTicketActionType } from "../action-types/focusedTicketActionType";
import { Action } from "../actions/focusedTicketAction";

const initialState = {ticket: {}}; 

const focusedTicketReducer = (state: any = initialState, action: Action) => {
    switch(action.type){
        case focusedTicketActionType.UPDATE:
            return action.payload;
        case focusedTicketActionType.EDIT:
            let editedTicket = {...state}
            console.log(state)
            console.log(editedTicket)
            editedTicket.assignee_username= action.payload.assignee.username
            editedTicket.assignee_user_discriminator= action.payload.assignee.discriminator
            editedTicket.description= action.payload.description
            editedTicket.priority= action.payload.priority
            editedTicket.resolution_status= action.payload.resolution_status
            return editedTicket
        default: 
            return state; 
    }
}

export default focusedTicketReducer
