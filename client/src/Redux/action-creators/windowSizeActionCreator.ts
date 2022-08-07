import { Dispatch } from "redux";
import { windowSizeActionType } from "../action-types/windowSizeActionType";
import { Action } from "../actions/windowSizeAction";

export const updateSize = (width: number) => {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: windowSizeActionType.UPDATE,
        payload: width,
      });
    };
  };