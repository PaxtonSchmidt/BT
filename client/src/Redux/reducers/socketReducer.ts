import { socketActionType } from '../action-types/socketActionType';
import { Action } from '../actions/socketAction';

const socketReducer = (state: any = null, action: Action) => {
  switch (action.type) {
    case socketActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default socketReducer;
