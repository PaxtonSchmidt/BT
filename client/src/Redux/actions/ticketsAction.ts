import { Ticket } from "../../API/interfaces/ticket"
import { ticketsActionType } from "../action-types/ticketsActionType"

interface UpdateAction {
    type: ticketsActionType.UPDATE,
    payload: Ticket[]
}

interface RemoveAction {
    type: ticketsActionType.REMOVE,
    payload: Ticket
}

interface AddAction {
    type: ticketsActionType.ADD,
    payload: Ticket
}

interface EditAction {
    type: ticketsActionType.EDIT,
    payload: Ticket
}

export type Action = UpdateAction | RemoveAction | AddAction | EditAction



