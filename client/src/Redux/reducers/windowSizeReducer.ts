import { windowSizeActionType } from "../action-types/windowSizeActionType";
import { Action } from "../actions/windowSizeAction";

const windowSizeReducer = (state: any = 0, action: Action) => {
  switch (action.type) {
    case windowSizeActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default windowSizeReducer;
