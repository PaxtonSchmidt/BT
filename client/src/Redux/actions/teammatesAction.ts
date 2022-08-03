import { teammatesActionType } from '../action-types/teammatesActionType';
import { Teammate } from '../interfaces/teammate';

interface UpdateAction {
  type: teammatesActionType.UPDATE;
  payload: Teammate[];
}
interface updateTeammateRoleAction {
  type: teammatesActionType.UPDATE_TEAMMATE_ROLE;
  payload: Teammate;
}
interface RemoveTeammateAction {
  type: teammatesActionType.REMOVE_TEAMMATE;
  payload: Teammate;
}

export type Action =
  | UpdateAction
  | updateTeammateRoleAction
  | RemoveTeammateAction;
