import { currentUserActionType } from '../action-types/currentUserActionTypes';
import { currentUser } from '../interfaces/currentUser';

interface UpdateAction {
  type: currentUserActionType.UPDATE;
  payload: currentUser;
}

interface RemoveAction {
  type: currentUserActionType.REMOVE;
  payload: currentUser;
}

export type Action = UpdateAction | RemoveAction;
