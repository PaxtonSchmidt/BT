import { Ticket } from "../../API/interfaces/ticket"
import { focusedTicketActionType } from "../action-types/focusedTicketActionType"

interface updateFocusedTicket {
    type: focusedTicketActionType.UPDATE,
    payload: Ticket
}

export type Action = updateFocusedTicket



