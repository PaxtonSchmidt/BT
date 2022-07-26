import { act } from "@testing-library/react";
import { ticketsActionType } from "../action-types/ticketsActionType";
import { Action } from "../actions/ticketsAction";

const initialState = {tickets: []}; 

const ticketsReducer = (state: any = initialState, action: Action) => {
    switch(action.type){
        case ticketsActionType.UPDATE:
            if(action.payload === undefined){
                return action.payload
            }
            return action.payload;
        case ticketsActionType.REMOVE: 
            return state.filter((ticket: any) => ticket.ticket_id !== action.payload)
        case ticketsActionType.ADD:
            return [...state, action.payload]
        case ticketsActionType.EDIT:
            const idx = state.findIndex((ticket: any) => {return ticket.ticket_id === action.payload.ticket_id})
            let editedTicket = {...state[idx]}
            editedTicket.assignee_username= action.payload.assignee.username
            editedTicket.assignee_user_discriminator= action.payload.assignee.discriminator
            editedTicket.description= action.payload.description
            editedTicket.priority= action.payload.priority
            editedTicket.resolution_status= action.payload.resolution_status
            return [...state.slice(0, idx), editedTicket, ...state.slice(idx+1)]
        default: 
            return state; 
    }
}

export default ticketsReducer
