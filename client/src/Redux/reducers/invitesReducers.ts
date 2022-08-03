import { invitesActionType } from '../action-types/invitesActionTypes';
import { Action } from '../actions/invitesActions';

const initialState = { invites: [] };

const invitesReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case invitesActionType.UPDATE:
      if (action.payload === undefined) {
        return action.payload;
      }
      return action.payload;
    case invitesActionType.REMOVE:
      return state.filter((invite: any) => invite.invite_id !== action.payload);
    default:
      return state;
  }
};

export default invitesReducer;
