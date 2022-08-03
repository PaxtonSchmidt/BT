import { Ticket } from '../../API/interfaces/ticket';
import { ticketsActionType } from '../action-types/ticketsActionType';
import { Teammate } from '../interfaces/teammate';

interface UpdateAction {
  type: ticketsActionType.UPDATE;
  payload: Ticket[];
}

interface RemoveAction {
  type: ticketsActionType.REMOVE;
  payload: Ticket;
}

interface AddAction {
  type: ticketsActionType.ADD;
  payload: Ticket;
}

interface EditAction {
  type: ticketsActionType.EDIT;
  payload: Ticket;
}

interface unnasignRemovedTeammatesTickets {
  type: ticketsActionType.UNASSIGN_REMOVED_TEAMMATES_TICKETS;
  payload: Teammate;
}

export type Action =
  | UpdateAction
  | RemoveAction
  | AddAction
  | EditAction
  | unnasignRemovedTeammatesTickets;
