import { Dispatch } from 'redux';
import { teammatesActionType } from '../action-types/teammatesActionType';
import { Action } from '../actions/teammatesAction';
import { Teammate } from '../interfaces/teammate';

export const updateTeammates = (teammates: Teammate[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: teammatesActionType.UPDATE,
      payload: teammates,
    });
  };
};
export const updateTeammateRole = (teammate: Teammate) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: teammatesActionType.UPDATE_TEAMMATE_ROLE,
      payload: teammate,
    });
  };
};
export const removeTeammate = (teammate: Teammate) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: teammatesActionType.REMOVE_TEAMMATE,
      payload: teammate,
    });
  };
};
