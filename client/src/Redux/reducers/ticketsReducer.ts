import { act } from '@testing-library/react';
import { ticket } from '../../Components/ComponentInterfaces/ticket';
import { ticketsActionType } from '../action-types/ticketsActionType';
import { Action } from '../actions/ticketsAction';

const initialState: ticket[] = [];

const ticketsReducer = (state: any = initialState, action: Action) => {
  let newTicketList: any[] = [];
  switch (action.type) {
    case ticketsActionType.UPDATE:
      if (action.payload === undefined) {
        return action.payload;
      }
      return action.payload;
    case ticketsActionType.REMOVE:
      return state.filter((ticket: any) => ticket.ticket_id !== action.payload);
    case ticketsActionType.ADD:
      return [...state, action.payload];
    case ticketsActionType.EDIT:
      const idx = state.findIndex((ticket: any) => {
        return ticket.ticket_id === action.payload.ticket_id;
      });
      let editedTicket = { ...state[idx] };
      editedTicket.assignee_username =
        action.payload.assignee === undefined
          ? ''
          : action.payload.assignee.username;
      editedTicket.assignee_user_discriminator =
        action.payload.assignee === undefined
          ? null
          : action.payload.assignee.discriminator;
      editedTicket.description = action.payload.description;
      editedTicket.priority = action.payload.priority;
      editedTicket.resolution_status = action.payload.resolution_status;
      return [...state.slice(0, idx), editedTicket, ...state.slice(idx + 1)];
    case ticketsActionType.UNASSIGN_REMOVED_TEAMMATES_TICKETS:
      newTicketList = [...state];
      newTicketList.forEach((ticket: any, index) => {
        if (
          ticket.assignee_username === action.payload.username &&
          ticket.assignee_user_discriminator === action.payload.discriminator
        ) {
          newTicketList[index].assignee_username = 'none';
          newTicketList[index].assignee_user_discriminator = null;
          newTicketList[index].resolution_status = 1;
        }
      });
      console.log(newTicketList);
      return newTicketList;
    default:
      return state;
  }
};

export default ticketsReducer;
