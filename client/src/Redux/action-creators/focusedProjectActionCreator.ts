import { Dispatch } from 'redux';
import { focusedProjectActionType } from '../action-types/focusedProjectActionType';
import { Action } from '../actions/focusedProjectAction';
import { Project } from '../interfaces/project';

export const updateFocusedProject = (project: Project) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: focusedProjectActionType.UPDATE,
      payload: project,
    });
  };
};
