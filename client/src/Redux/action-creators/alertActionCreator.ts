import { Action, Dispatch } from 'redux';
import { alertActionType } from '../action-types/alertActionType';
import { alert } from '../interfaces/alert';

export const fireAlert = (alert: alert) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: alertActionType.FIRE,
      payload: alert,
    });
  };
};
export const hideAlert = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: alertActionType.HIDE,
    });
  };
};
