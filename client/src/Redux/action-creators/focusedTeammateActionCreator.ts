import { Dispatch } from 'redux';
import { focusedTeammateActionType } from '../action-types/focusedTeammateActionType';
import { Action } from '../actions/focusedTeammateAction';
import { Teammate } from '../../API/interfaces/teammate';

export const updateFocusedTeammate = (Teammate: Teammate) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: focusedTeammateActionType.UPDATE,
      payload: Teammate,
    });
  };
};
