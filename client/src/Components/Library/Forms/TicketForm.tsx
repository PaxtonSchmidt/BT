import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Formik, FormikValues } from 'formik';
import { MenuItem, TextField } from '@mui/material';
import postTicket from '../../../API/Requests/Tickets/PostTicket';
import { useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import putEditTicket from '../../../API/Requests/Tickets/PutEditTicket';
import { bindActionCreators } from 'redux';
import {
  AlertActionCreators,
  FocusedTicketActionCreators,
  TicketsActionCreators,
} from '../../../Redux';
import alertDispatcher from '../../../API/Requests/AlertDispatcher'
import { Ticket } from '../../../API/interfaces/ticket';

interface Props {
  isExtended?: boolean;
  setIsExtended?: Dispatch<SetStateAction<boolean>>;
  setIsEditOpen?: any;
  isEditMode?: boolean;
}

interface AssigneeValue {
  username: string;
  discriminator: number | null;
  role_id: number;
  project_id: number;
}

export default function TicketForm(props: Props) {
  let dispatch = useDispatch();
  const formRef: any = useRef();
  const { updateFocusedTicket, editFocusedTicket } = bindActionCreators(FocusedTicketActionCreators,dispatch);
  const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators,dispatch);
  const { addTicket, editTicket } = bindActionCreators(TicketsActionCreators,dispatch);
  const [isDisabled, setIsDisabled] = useState(!props.isEditMode);
  const sessionState = useSelector((state: State) => state.session);
  const focusedTicketState = useSelector((state: State) => state.focusedTicket);
  const [intendedProject, setIntendedProject] = useState<any>();
  let projectValues = sessionState.currentTeam?.projects.map(
    (project: any) => project.name
  );
  let isFormTransitioned: string =
    props.isExtended === true ? 'FormTransition' : '';
  let noAssignee: AssigneeValue = {
    username: 'none',
    discriminator: null,
    project_id: -1,
    role_id: -1,
  };
  let assigneeValues: any[] = [noAssignee];

  useEffect(() => {
    if (props.isEditMode) {
      let project = sessionState.currentTeam.projects.filter(
        (project: any) => project.name === focusedTicketState.project_name
      )[0];
      handleSetIntendedProject(project);
    }
  }, []);

  useEffect(() => {
    intendedProject &&
      intendedProject.project_members.forEach((member: any) =>
        assigneeValues.push(member)
      );
    let assigneeIDX = assigneeValues.findIndex((assignee: AssigneeValue) => {
      return (
        assignee.username === focusedTicketState.assignee_username &&
        assignee.discriminator ===
          focusedTicketState.assignee_user_discriminator
      );
    });
    if (props.isEditMode && formRef.current) {
      formRef.current.setValues({
        title: `${focusedTicketState.title}`,
        description: `${focusedTicketState.description}`,
        project: `${focusedTicketState.project_name}`,
        assignee: assigneeValues[assigneeIDX],
        priority: `${focusedTicketState.priority}`,
        resolution_status: `${focusedTicketState.resolution_status}`,
        ticket_id: focusedTicketState.ticket_id,
      });
    }
    formRef.current.setFieldValue(
      'assignee',
      props.isEditMode ? assigneeValues[assigneeIDX] : noAssignee
    );
  }, [intendedProject, []]);

  function handleSetIntendedProject(project: any) {
    setIntendedProject(project);
  }

  const priority = [
    { id: 1, descriptor: 'high' },
    { id: 2, descriptor: 'medium' },
    { id: 3, descriptor: 'low' },
  ];
  const status = [
    { id: 1, descriptor: 'Unassigned' },
    { id: 2, descriptor: 'Assigned' },
    { id: 3, descriptor: 'Investigating' },
    { id: 4, descriptor: 'Reviewing' },
    { id: 5, descriptor: 'Closed' },
  ];

  function handleOnProjectSelect(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let project = sessionState.currentTeam.projects.filter(
      (project: any) => project.name === e.target.value
    )[0];
    handleSetIntendedProject(project);
  }

  let initialData: any = {
    title: '',
    description: '',
    project: '',
    assignee: '',
    priority: '',
    resolution_status: '',
  };
  return (
    <>
    <div className={`loginFormContainer ${props.isEditMode ? 'fadeIn' : ''} ${isFormTransitioned}`} style={{paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px', borderRadius: '0px', boxShadow: 'none', transition: '.5s', opacity: `${!props.isExtended && !props.isEditMode ? '0%' : ''}`}}>
    {!props.isEditMode && <h4 className='header' style={{textAlign: 'center'}}>New Ticket</h4>} 
    {props.isEditMode && <h4 className='header' style={{textAlign: 'center', paddingLeft: '5px', paddingRight: '5px'}}>{`${focusedTicketState.title}`}</h4>} 
      <Formik
        innerRef={formRef}
        initialValues={initialData}
        onSubmit={(data, { resetForm }) => {
          data.resolution_status = parseInt(data.resolution_status);
          data.priority = parseInt(data.priority);
          if (data.title.length > 50) {
            fireAlert({
              isOpen: true,
              status: 0,
              message: 'Max title length is 50 characters...',
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
            if (!props.isEditMode) {
              async function handleSubmitTicket() {
                let response = await postTicket(data);
                !response.isOk 
                ? alertDispatcher(fireAlert, response.error, hideAlert)
                : (()=>{
                  if (props.setIsExtended) {
                    props.setIsExtended(false);
                  }
                  let isDemo: boolean = sessionStorage.getItem('isDemo') === 'true'
                  if(isDemo){
                    let demoFakeTicket = {
                    assignee_user_discriminator: data.assignee.discriminator,
                    assignee_username: data.assignee.username,
                    author_discriminator: sessionState.currentUser.discriminator,
                    author_username: sessionState.currentUser.username,
                    date_created: "2022-99-10T20:52:00.000Z",
                    date_last_updated: "2022-99-10T20:52:00.000Z",
                    description: data.description,
                    priority: data.priority,
                    project_id: sessionState.currentTeam.projects.find((project: any)=> project.name === data.project).project_id,
                    project_name: data.project,
                    resolution_status: data.resolution_status,
                    ticket_id: Math.floor(Math.random() * -100),
                    title: data.title
                    }
                    updateFocusedTicket(demoFakeTicket);
                    addTicket(demoFakeTicket);
                  } else {
                    updateFocusedTicket(response.body.ticket);
                    addTicket(response.body.ticket);
                  }
                  
                  resetForm();
                })()
              }
              handleSubmitTicket();
            } else {
              async function handleEditTicket() {
                let response = await putEditTicket(
                  data,
                  focusedTicketState.ticket_id,
                  focusedTicketState.project_id
                )
                if(response.isOk){
                  editTicket(data);
                  editFocusedTicket(data);
                  resetForm();
                  props.setIsEditOpen(false);
                } else {
                  alertDispatcher(fireAlert, response.error, hideAlert)
                }
              }
              handleEditTicket();
            }
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, resetForm }) => {
          return (
            <form
              id='ticketForm'
              
              style={{paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px', backgroundColor: '#222222'}}
              onSubmit={handleSubmit}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <div className='formContainer' 
                style={{display: 'flex', 
                flexDirection:'column', 
                justifyContent: 'space-between',
                textAlign: 'left'

                
              }}>
                {!props.isEditMode &&
                  <TextField
                    disabled={props.isEditMode}
                    label='Title'
                    type='text'
                    value={values.title}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    fullWidth
                    name='title'
                    variant='standard'
                    color='info'
                    required
                  />
                  }
                  
                  <TextField
                    select
                    name='priority'
                    required
                    defaultValue={''}
                    value={values.priority}
                    label='Priority'
                    fullWidth
                    color='info'
                    variant='standard'
                    onBlur={handleBlur('priority')}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {priority.map((priority, index) => {
                      return (
                        <MenuItem
                          key={priority.id}
                          value={priority.id}
                          id='priority'
                        >
                          {priority.descriptor}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <TextField
                    disabled={props.isEditMode}
                    select
                    name='project'
                    value={values.project}
                    label='Project'
                    fullWidth
                    color='info'
                    variant='standard'
                    onChange={(e) => {
                      handleChange(e);
                      handleOnProjectSelect(e);
                      setIsDisabled(false);
                    }}
                    onBlur={handleBlur}
                    required
                  >
                    <p style={{ height: '0px', margin: '0px' }}></p>
                    {projectValues?.map((project: any, index: number) => [
                      <MenuItem key={index} value={project} id='project'>
                        {project}
                      </MenuItem>,
                    ])}
                  </TextField>
                  <TextField
                    disabled={isDisabled}
                    defaultValue={''}
                    select
                    name='assignee'
                    value={values.assignee}
                    label='Assignee'
                    fullWidth
                    color='info'
                    variant='standard'
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                  >
                    <p style={{ height: '0px', margin: '0px' }}></p>
                    {assigneeValues?.map((member: any, index: any) => {
                      let isNullOption: string =
                        member.username === 'none' &&
                        member.discriminator === null
                          ? ''
                          : '#';
                      return (
                        <MenuItem key={index} value={member} id='user'>
                          {member.username} {isNullOption}
                          {member.discriminator}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <TextField
                    select
                    name='resolution_status'
                    defaultValue={''}
                    value={values.resolution_status}
                    label='Status'
                    fullWidth
                    color='info'
                    variant='standard'
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                  >
                    <p style={{ height: '0px', margin: '0px' }}></p>
                    {status?.map((status: any) => {
                      return (
                        <MenuItem key={status.id} value={status.id} id='status'>
                          {status.descriptor}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <TextField
                    label='Description'
                    type='text'
                    value={values.description}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    fullWidth
                    sx={{ color: '#ffffff' }}
                    name='description'
                    variant='standard'
                    color='info'
                    multiline
                    required
                  />
              </div>
              <div style={{width :'100%', display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '50px'}}>
                <button
                    type='reset'
                    onClick={() => {
                      if (props.setIsEditOpen) {
                        props.setIsEditOpen();
                      } else if (props.setIsExtended) {
                        props.setIsExtended(false);
                        resetForm()
                      }
                      setIsDisabled(true);
                      resetForm()
                    }}
                    className='button cancelButton'
                    style={{ 
                      margin: '2px 2px 10px 0px',
                      borderRadius: '5px',
                      height: 'fit-content'
                  }}
                  >
                    X
                  </button>
                  <button
                    type='submit'
                    name='submit'
                    className='button scaleYonHover hoverGrey'
                    style={{
                      margin: '2px 0px 10px 0px',
                      borderRadius: '5px',
                      height: 'fit-content'
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
