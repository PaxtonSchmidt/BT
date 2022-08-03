import { currentUserActionType } from '../action-types/currentUserActionTypes';
import { Action } from '../actions/currentUserAction';
import { currentUser } from '../interfaces/currentUser';

const initialState = { currentUser: [] };

const currentUserReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case currentUserActionType.UPDATE:
      return action.payload;
    case currentUserActionType.REMOVE:
      return state.filter(
        (currentUser: currentUser) => currentUser === action.payload
      );
    default:
      return state;
  }
};

export default currentUserReducer;
