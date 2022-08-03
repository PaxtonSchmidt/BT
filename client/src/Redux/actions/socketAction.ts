import { socketActionType } from '../action-types/socketActionType';

interface updateSocket {
  type: socketActionType.UPDATE;
  payload: any;
}

export type Action = updateSocket;
