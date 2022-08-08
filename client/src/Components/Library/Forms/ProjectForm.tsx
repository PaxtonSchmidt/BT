import React, { Dispatch, SetStateAction, useRef } from 'react';
import { Formik, FormikValues } from 'formik';
import { TextField } from '@mui/material';
import postProject from '../../../API/Requests/Projects/PostProject';
import { bindActionCreators } from 'redux';
import {
  AlertActionCreators,
  FocusedProjectActionCreators,
  SessionActionCreators,
} from '../../../Redux';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectMember } from '../../../Redux/interfaces/member';
import { State } from '../../../Redux/reducers';
import { Project } from '../../../Redux/interfaces/session';
import alertDispatcher from '../../../API/Requests/AlertDispatcher';

interface Props {
  isExtended: boolean;
  setIsExtended: Dispatch<SetStateAction<boolean>>;
}

export default function ProjectForm(props: Props) {
  const dispatch = useDispatch();
  const { fireAlert, hideAlert } = bindActionCreators(
    AlertActionCreators,
    dispatch
  );
  const { addProjectToSession } = bindActionCreators(
    SessionActionCreators,
    dispatch
  );
  const { updateFocusedProject } = bindActionCreators(
    FocusedProjectActionCreators,
    dispatch
  );
  const sessionState = useSelector((state: State) => state.session);
  let isFormTransitioned: string =
  props.isExtended === true ? 'FormTransition' : '';
  return (
    <>
    <div className={`loginFormContainer ${isFormTransitioned}`} style={{borderRadius: '0px', boxShadow: 'none', transition: '.5s'}}>
      <Formik
        initialValues={{ name: '', description: '' }}
        onSubmit={(data, { resetForm }) => {
          (async () => {
            if (data.name.length > 50) {
              fireAlert({
                isOpen: true,
                status: 0,
                message: 'Max name length is 50 characters...',
              });
              setTimeout(hideAlert, 6000);
              return;
            } else if (data.description.length > 1000) {
              fireAlert({
                isOpen: true,
                status: 0,
                message: 'Max description length is 1000 characters...',
              });
              setTimeout(hideAlert, 6000);
              return;
            } else {
              let response = await postProject(data);
              if(!response.isOk){
                alertDispatcher(fireAlert, response.error, hideAlert)
              } else {
                let newProjectCreatorRole: number =
                sessionState.currentTeam.team_role;
                let projectCreator: ProjectMember = {
                  username: sessionState.currentUser.username,
                  discriminator: sessionState.currentUser.discriminator,
                  role_id: newProjectCreatorRole,
                  project_id: response.body.project_id,
                };
                let newProject: Project = {
                  name: data.name,
                  role_id: newProjectCreatorRole,
                  project_id: response.body.project_id,
                  project_members: [projectCreator],
                };
                addProjectToSession(newProject);
                updateFocusedProject(newProject);
                props.setIsExtended(false);
                resetForm();
              }
            }
          })();
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, resetForm }) => {
          return (
            <form
              className='delayedFadeIn form'
              style={{ width: 'fit-content' }}
              onSubmit={handleSubmit}
              onBlur={handleBlur}
            >
                <h4 className='header'>New Project</h4>
                <TextField
                  label='Name'
                  type='text'
                  value={values.name}
                  onChange={(e) => handleChange(e)}
                  onBlur={handleBlur}
                  className='formComponent'
                  name='name'
                  variant='standard'
                  color='info'
                  required
                  fullWidth
                />
                <TextField
                  name='description'
                  type='text'
                  value={values.description}
                  label='Description'
                  className='formComponent'
                  color='info'
                  variant='standard'
                  onChange={(e) => handleChange(e)}
                  onBlur={handleBlur}
                  required
                  fullWidth
                />
                <div style={{width :'100%', display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '50px'}}>
                  <button
                    type='reset'
                    onClick={() => {
                      resetForm();
                      props.setIsExtended(false);
                    }}
                    className='button scaleYonHover cancelButton'
                    style={{ 
                      margin: '2px 2px 0px 0px', 
                      borderRadius:'5px' 
                    }}
                  >
                    X
                  </button>
                  <button
                    type='submit'
                    name='submit'
                    className='button hoverGrey scaleYonHover'
                    style={{
                      margin: '2px 0px 0px 0px',
                      borderRadius:'5px'
                    }}
                  >
                    Submit
                  </button>
                </div>
            </form>
          );
        }}
      </Formik>
      </div>
    </>
  );
}
