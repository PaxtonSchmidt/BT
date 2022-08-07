import { windowSizeActionType } from "../action-types/windowSizeActionType";

interface UpdateAction {
  type: windowSizeActionType.UPDATE;
  payload: number;
}

export type Action = UpdateAction