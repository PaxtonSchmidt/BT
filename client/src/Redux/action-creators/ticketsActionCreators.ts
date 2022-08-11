import { Dispatch } from 'redux';
import { Ticket } from '../../API/interfaces/ticket';
import { ticketsActionType } from '../action-types/ticketsActionType';
import { Action } from '../actions/ticketsAction';
import { Teammate } from '../interfaces/teammate';

export const updateTickets = (tickets: Ticket[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ticketsActionType.UPDATE,
      payload: tickets,
    });
  };
};
export const remove = (ticket: Ticket) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ticketsActionType.REMOVE,
      payload: ticket,
    });
  };
};
export const addTicket = (ticket: any) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ticketsActionType.ADD,
      payload: ticket,
    });
  };
};
export const editTicket = (ticket: Ticket) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ticketsActionType.EDIT,
      payload: ticket,
    });
  };
};
export const unnasignRemovedTeammatesTickets = (teammate: Teammate) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ticketsActionType.UNASSIGN_REMOVED_TEAMMATES_TICKETS,
      payload: teammate,
    });
  };
};
