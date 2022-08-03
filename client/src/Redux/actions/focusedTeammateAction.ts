import { focusedTeammateActionType } from '../action-types/focusedTeammateActionType';
import { Teammate } from '../../API/interfaces/teammate';

interface updateFocusedTeammate {
  type: focusedTeammateActionType.UPDATE;
  payload: Teammate;
}

export type Action = updateFocusedTeammate;
