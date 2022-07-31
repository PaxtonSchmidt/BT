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
export const editFocusedTicket = (ticket: Ticket) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: focusedTicketActionType.EDIT,
            payload: ticket
        })
    }
}
export const setFocusedTicketToUnassigned = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: focusedTicketActionType.SET_TO_UNASSIGNED
        })
    }
}