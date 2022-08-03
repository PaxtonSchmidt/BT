import { focusedProjectActionType } from '../action-types/focusedProjectActionType';
import { Project } from '../interfaces/project';

interface updateFocusedProject {
  type: focusedProjectActionType.UPDATE;
  payload: Project;
}

export type Action = updateFocusedProject;
