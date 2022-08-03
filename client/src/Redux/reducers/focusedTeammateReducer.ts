import { focusedTeammateActionType } from '../action-types/focusedTeammateActionType';
import { Action } from '../actions/focusedTeammateAction';

const initialState = {};

const focusedTeammateReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case focusedTeammateActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default focusedTeammateReducer;
