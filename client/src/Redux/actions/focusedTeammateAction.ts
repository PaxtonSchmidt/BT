import { focusedTeammateActionType } from '../action-types/focusedTeammateActionType';
import { Teammate } from '../../API/interfaces/teammate';

interface updateFocusedTeammate {
  type: focusedTeammateActionType.UPDATE;
  payload: Teammate;
}

interface resetFocusedTeammate {
  type: focusedTeammateActionType.RESET_TEAMMATE
}

export type Action = updateFocusedTeammate | resetFocusedTeammate;
