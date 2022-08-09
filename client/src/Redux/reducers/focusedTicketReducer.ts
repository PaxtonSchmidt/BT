import { resetFocusedTicket } from '../action-creators/focusedTicketActionCreator';
import { focusedTicketActionType } from '../action-types/focusedTicketActionType';
import { Action } from '../actions/focusedTicketAction';

const initialState = { ticket: {} };

const focusedTicketReducer = (state: any = initialState, action: Action) => {
  let editedTicket: any = {};
  switch (action.type) {
    case focusedTicketActionType.UPDATE:
      return action.payload;
    case focusedTicketActionType.RESET:
      return initialState;
    case focusedTicketActionType.EDIT:
      editedTicket = { ...state };
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
      return editedTicket;
    case focusedTicketActionType.SET_TO_UNASSIGNED:
      let unassignedTicketID = 1;
      editedTicket = { ...state };
      editedTicket.assignee_username = 'none';
      editedTicket.assignee_user_discriminator = null;
      editedTicket.resolution_status = unassignedTicketID;
      return editedTicket;
    default:
      return state;
  }
};

export default focusedTicketReducer;
