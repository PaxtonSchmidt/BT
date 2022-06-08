import { Dispatch } from "redux"
import { Ticket } from "../../API/interfaces/ticket"
import { focusedTicketActionType } from "../action-types/focusedTicketActionType"
import { Action } from "../actions/focusedTicketAction"

export const updateFocusedTicket = (ticket: Ticket) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: focusedTicketActionType.UPDATE,
            payload: ticket
        })
    }
}