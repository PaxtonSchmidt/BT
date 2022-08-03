import { number } from 'yup';
import { alertActionType } from '../action-types/alertActionType';
import { Action } from '../actions/alertAction';

const initialState = {};

const alertReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case alertActionType.FIRE:
      return action.payload;
    case alertActionType.HIDE:
      return { isOpen: false, status: state.status, message: state.message };
    default:
      return state;
  }
};

export default alertReducer;
