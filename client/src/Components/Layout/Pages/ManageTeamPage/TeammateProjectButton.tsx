import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  AlertActionCreators,
  FocusedMemberActionCreators,
  FocusedProjectActionCreators,
} from '../../../../Redux';
import { Project, Session } from '../../../../Redux/interfaces/session';
import { State } from '../../../../Redux/reducers';

interface Props {
  Project: string;
  teammateUsername: string;
  teammateDiscriminator: number;
}

export default function TeammateProjectButton(props: Props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionState: Session = useSelector((state: State) => state.session);
  const { updateFocusedProject } = bindActionCreators(
    FocusedProjectActionCreators,
    dispatch
  );
  const { updateFocusedMember } = bindActionCreators(
    FocusedMemberActionCreators,
    dispatch
  );
  const { fireAlert, hideAlert } = bindActionCreators(
    AlertActionCreators,
    dispatch
  );
  function handleSelect() {
    let projectIDX = sessionState.currentTeam.projects.findIndex(
      (project: Project) => {
        return project.name === props.Project;
      }
    );
    if (projectIDX === -1) {
      fireAlert({
        isOpen: true,
        status: 0,
        message: `Because you are not on the ${props.Project} project, you cannot access its details...`,
      });
      setTimeout(hideAlert, 6000);
    } else {
      updateFocusedMember({
        username: props.teammateUsername,
        discriminator: props.teammateDiscriminator,
      });
      updateFocusedProject({ name: props.Project });
      navigate('/projects');
    }
  }
  return (
    <div
      onClick={() => handleSelect()}
      className='teammateProjectButton scaleYonHover'
      style={{color: 'white'}}
    >
      {props.Project}
    </div>
  );
}
