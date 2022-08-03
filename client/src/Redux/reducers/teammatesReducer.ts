import { teammatesActionType } from '../action-types/teammatesActionType';
import { Action } from '../actions/teammatesAction';
import { Teammate } from '../interfaces/teammate';

const initialState = {};

const teammatesReducer = (state: any = initialState, action: Action) => {
  let newState = [];
  let targetTeammateIDX: number | null = null;
  switch (action.type) {
    case teammatesActionType.UPDATE:
      return action.payload;
    case teammatesActionType.UPDATE_TEAMMATE_ROLE:
      newState = [...state];
      targetTeammateIDX = newState.findIndex((teammate: Teammate) => {
        return (
          teammate.username === action.payload.username &&
          teammate.discriminator === action.payload.discriminator
        );
      });
      newState.splice(targetTeammateIDX, 1, action.payload);
      return newState;
    case teammatesActionType.REMOVE_TEAMMATE:
      newState = [...state];
      targetTeammateIDX = newState.findIndex((teammate: Teammate) => {
        return (
          teammate.username === action.payload.username &&
          teammate.discriminator === action.payload.discriminator
        );
      });
      newState.splice(targetTeammateIDX, 1);
      return newState;
    default:
      return state;
  }
};

export default teammatesReducer;
