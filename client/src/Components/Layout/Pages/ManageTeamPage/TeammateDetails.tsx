import { Box, Modal } from '@mui/material';
import e from 'express';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { json } from 'stream/consumers';
import { Teammate } from '../../../../API/interfaces/teammate';
import alertDispatcher from '../../../../API/Requests/AlertDispatcher';
import { CustomResponse } from '../../../../API/Requests/Base/baseRequest';
import deleteTeammate from '../../../../API/Requests/Teams/DeleteTeammate';
import getTeammatesInfo from '../../../../API/Requests/Teams/GetTeammatesInfo';
import putUpdateTeammateRole from '../../../../API/Requests/Teams/PutUpdateTeamRole';
import {
  AlertActionCreators,
  FocusedTeammateActionCreators,
  FocusedTicketActionCreators,
  SessionActionCreators,
  TeammatesActionCreators,
  TicketsActionCreators,
} from '../../../../Redux';
import { updateTeammateRole } from '../../../../Redux/action-creators/teammatesActionCreators';
import { unnasignRemovedTeammatesTickets } from '../../../../Redux/action-creators/ticketsActionCreators';
import { State } from '../../../../Redux/reducers';
import { translateRole } from '../../../../Services/translateRole';
import UpdateUserRole from '../../../Library/Buttons/UpdateUserRole';
import TeammateProjectButton from './TeammateProjectButton';

interface AssignedProjects {
  project_name: string;
  role_id: number;
}
export interface TeammatesInformation extends Teammate {
  username: string;
  discriminator: number;
  team_role: number;
  date_joined: string;
  enlisted_by_username: string;
  enlisted_by_discriminator: number;
  projects: AssignedProjects[];
}

interface Props {
  isModalVersion?: boolean
}

export default function TeammateDetails(props: Props) {
  const dispatch = useDispatch();
  const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators,dispatch);
  const { updateTeammateRole, removeTeammate } = bindActionCreators(TeammatesActionCreators,dispatch)
  const { removeTeammateFromSessionProjects } = bindActionCreators(SessionActionCreators, dispatch);
  const { unnasignRemovedTeammatesTickets } = bindActionCreators(TicketsActionCreators,dispatch);
  const { setFocusedTicketToUnassigned } = bindActionCreators(FocusedTicketActionCreators,dispatch);
  const { updateFocusedTeammate } = bindActionCreators(FocusedTeammateActionCreators,dispatch);
  const sessionState = useSelector((state: State) => state.session);
  const focusedTeammateState = useSelector((state: State) => state.focusedTeammate);
  const focusedTicketState = useSelector((state: State) => state.focusedTicket);
  const [teammatesInformation, setTeammatesInformation] = useState<any>();
  const [chosenTeammate, setChosenTeammate] = useState<TeammatesInformation>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
  let canUserManageTeammateRole: boolean = false;

  async function getTeamatesInformation() {
    setIsLoading(true);
    let response: CustomResponse = await getTeammatesInfo()
    if(response.isOk){
      setTeammatesInformation(response.body)
      setIsLoading(false);
    } else {
      alertDispatcher(fireAlert, response.error, hideAlert)
    }
  }
  useEffect(() => {
    getTeamatesInformation();
  }, []);

  function handleNewTeammate() {
    let chosenTeammate: TeammatesInformation | undefined =
      teammatesInformation!.find((teammate: TeammatesInformation) => {
        if (
          teammate.username === focusedTeammateState.username &&
          teammate.discriminator === focusedTeammateState.discriminator
        ) {
          return true;
        }
      });
    setChosenTeammate(chosenTeammate);
  }
  useEffect(() => {
    if (teammatesInformation !== undefined) {
      handleNewTeammate();
    }
  }, [focusedTeammateState, teammatesInformation]);

  let role = null;
  let date = '';
  let roleUpdateType = '';
  let potentialNewTeamRole: string = 'Null';
  if (chosenTeammate) {
    role = translateRole.TranslateRole(chosenTeammate?.team_role);
    date = chosenTeammate.date_joined.toString().substring(0, 10);
    if (
      (sessionState.currentTeam.team_role === 1 &&
        chosenTeammate.team_role === 2) ||
      (sessionState.currentTeam.team_role === 1 &&
        chosenTeammate.team_role === 3)
    ) {
      canUserManageTeammateRole = true;
    } else {
      canUserManageTeammateRole = false;
    }
    if (chosenTeammate.team_role === 2) {
      roleUpdateType = 'Demote';
    } else if (chosenTeammate.team_role === 3) {
      roleUpdateType = 'Promote';
    }
  }
  if (roleUpdateType === 'Demote') {
    potentialNewTeamRole = 'Developer';
  } else if (roleUpdateType === 'Promote') {
    potentialNewTeamRole = 'Lead';
  }

  async function handleRemoveTeammate() {
    let teammate = {
      username: focusedTeammateState.username,
      discriminator: focusedTeammateState.discriminator,
    };
    let response: CustomResponse = await deleteTeammate(teammate)
    response.isOk
    ? (()=>{
      // remove from teammates list
      removeTeammate(teammate);
      //remove from session state projects
      removeTeammateFromSessionProjects(teammate);
      //set their tickets to unassigned
      unnasignRemovedTeammatesTickets(teammate);
      //unassign the ticket in focusedTicketState if they are the assignee
      if (
        teammate.username === focusedTicketState.assignee_username &&
        teammate.discriminator === focusedTicketState.assignee_user_discriminator) {
        setFocusedTicketToUnassigned();
      }

      updateFocusedTeammate({
        username: '',
        discriminator: 0,
        team_role: -1,
      });
      setIsModalOpen(false);
    })()
    : alertDispatcher(fireAlert, response.error, hideAlert)
  }

  async function handleUpdateTeammateRole() {
    if (canUserManageTeammateRole === true && chosenTeammate) {
      let newRoleID = 3;
      if (roleUpdateType === 'Demote') {
        newRoleID = 3;
      } else if (roleUpdateType === 'Promote') {
        newRoleID = 2;
      } else {
        return;
      }
      let data = {
        username: chosenTeammate!.username,
        discriminator: chosenTeammate!.discriminator,
      };
      let response: any = await putUpdateTeammateRole(data, newRoleID);
      
      !response.isOk 
      ? alertDispatcher(fireAlert, response.error, hideAlert)
      : (() => {
        let newTeammatesInfo = [...teammatesInformation];
        let targetTeammateIdx = newTeammatesInfo.findIndex(
          (teammate: TeammatesInformation) =>
            data.username === teammate.username &&
            data.discriminator === teammate.discriminator
        );
        let editedTeammate = newTeammatesInfo[targetTeammateIdx];
        editedTeammate.team_role = newRoleID;
        newTeammatesInfo.splice(targetTeammateIdx, 1, editedTeammate);

        setTeammatesInformation(newTeammatesInfo);
        updateTeammateRole(editedTeammate);
        setIsRoleModalOpen(false);
      })()
    }
  }

  if (isLoading) {
    return (
      <>
        <div
          className='list delayedFadeIn'
          style={{ height: '100%', textAlign: 'center', paddingTop: '15px' }}
        >
          Loading...
        </div>
      </>
    );
  } else if (!chosenTeammate) {
    return (
      <>
        <div
          className='list fadeIn'
          style={{
            height: '100%',
            textAlign: 'center',
            paddingTop: '15px',
            transition: '0s',
          }}
        >
          Select a teammate to see their details
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          id='list'
          className={`list componentGlow ${props.isModalVersion ? '' : 'fadeIn'}`}
          style={{
            position: 'relative',
            height: '350px',
            overscrollBehavior: 'auto',
            overflowY: 'hidden',
            transition: '0s'
          }}
        >
          <div className='ListContainer'>
            <div
              className='listItem white listRow memberRow manageMemberListRow'
              style={{
                justifyContent: 'space-between',
                marginTop: 'auto',
                borderColor: 'white',
                paddingLeft: '0px',
                width: '100%'
              }}
            >
              <div
                className='memberListRowSection'
                style={{
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: '8px',
                }}
              >
                <div style={{ display: 'flex', height: 'fit-content', justifyContent: 'center', textAlign: 'center', width: '100%' }}>
                  <span
                    className='rowItem username'
                    style={{
                      display: 'inline-block',
                      width: 'fit-content',
                      height: 'fit-content',
                      marginTop: '6px',
                      marginBottom: 'auto'
                    }}
                  >
                    {chosenTeammate.username}
                  </span>
                  <span
                    className='rowItem discriminator'
                    style={{
                      display: 'inline-block',
                      width: 'fit-content',
                      marginTop: '8px',
                    }}
                  >
                    #{chosenTeammate.discriminator}
                  </span>
                </div>
              </div>
            </div>
            <div
              className='listItem listRow memberRow manageMemberListRow'
              style={{ justifyContent: 'space-between', paddingRight: '5px' }}
            >
              <div className='memberListRowSection roleRow'>
                <div
                  style={{
                    display: 'flex',
                    height: 'fit-content',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    className='rowItem'
                    style={{
                      display: 'inline-block',
                      width: 'fit-content',
                      height: '100%',
                      paddingTop: '6px',
                      marginRight: '10px',
                      marginLeft: '5px',
                    }}
                  >
                    {role}
                  </span>

                  {canUserManageTeammateRole && (
                    <span
                      id='RoleUpdate'
                      className='rowItem fadeIn inComponentButton scaleYonHover'
                      onClick={() => setIsRoleModalOpen(true)}
                      style={{
                        display: 'inline-block',
                        width: 'fit-content',
                        textAlign: 'center',
                        height: 'fit-content',
                      }}
                    >
                      {roleUpdateType}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div
              className='listItem listRow memberRow manageMemberListRow'
              style={{ justifyContent: 'space-between', width: 'calc(100%-5px)' }}
            >
              <div
                className='memberListRowSection'
                style={{ textAlign: 'left' }}
              >
                <span
                  className='rowItem username'
                  style={{
                    display: 'inline-block',
                    width: 'fit-content',
                    marginLeft: '5px',
                  }}
                >
                  Enlisted by
                </span>
                <span
                  className='rowItem username'
                  style={{ display: 'inline-block', width: 'fit-content' }}
                >
                  {`\u00A0${chosenTeammate.enlisted_by_username}`}
                </span>
                <span
                  className='rowItem discriminator'
                  style={{
                    display: 'inline-block',
                    width: 'fit-content',
                    opacity: '30%',
                    fontSize: '11px',
                  }}
                >
                  {`#${chosenTeammate.enlisted_by_discriminator}`}
                </span>
              </div>
            </div>
            <div
              className='listItem listRow memberRow manageMemberListRow '
              style={{ justifyContent: 'space-between' }}
            >
              <div
                className='memberListRowSection'
                style={{ textAlign: 'left' }}
              >
                <span
                  className='rowItem'
                  style={{
                    display: 'inline-block',
                    width: 'calc(100%-5px)',
                    marginLeft: '5px',
                  }}
                >
                  Joined
                </span>
                <span
                  className='rowItem'
                  style={{ display: 'inline-block', width: 'fit-content' }}
                >
                  {`\u00A0on ${date}`}
                </span>
              </div>
            </div>
          </div>
          <div
            className='memberProjectList'
            style={{ justifyContent: 'space-between' }}
          >
            <div
              className='memberListRowSection'
              style={{ textAlign: 'left', width: '100%' }}
            >
              <span
                className='rowItem'
                style={{
                  display: 'inline-block',
                  width: '80%',
                  paddingLeft: '5px',
                  color: 'white'
                }}
              >
                {chosenTeammate?.projects.length === 0
                  ? `${chosenTeammate.username} is not in any projects...`
                  : `Projects ${chosenTeammate.username} is in:`}
              </span>
              <span
                className='rowItem teammateProjectList'
                style={{
                  overflowX: 'hidden',
                  height: 'fit-content',
                  maxHeight: '70px',
                }}
              >
                {chosenTeammate?.projects.map((project: AssignedProjects) => (
                  <>
                    <TeammateProjectButton
                      Project={project.project_name}
                      teammateUsername={chosenTeammate.username}
                      teammateDiscriminator={chosenTeammate.discriminator}
                    />
                  </>
                ))}
              </span>
            </div>
          </div>
          {canUserManageTeammateRole && (
            <div
              className='removeMemberButton '
              style={{
                marginTop: 'auto',
                backgroundColor: '#222222',
                paddingRight: '5px',
              }}
            >
              <div
                onClick={() => setIsModalOpen(true)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <p style={{ marginRight: '10px', cursor: 'pointer' }}>Remove</p>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  fill='currentColor'
                  className='bi bi-x-square'
                  viewBox='0 0 16 16'
                >
                  <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
                  <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                </svg>
              </div>
            </div>
          )}
        </div>
        <Modal
          open={isModalOpen}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            className='modalBoxContainer'
            style={{ boxShadow: '0px 0px 5px red' }}
          >
            <div className='modalBox'>
              <p
                style={{ color: 'white' }}
                onClick={() => setIsModalOpen(false)}
              >
                {`Are you sure you want to remove\u00a0`}
                <span
                  className='rowItem username'
                  style={{
                    display: 'inline-block',
                    width: 'fit-content',
                    color: '#efff0a',
                  }}
                >
                  {focusedTeammateState.username}
                </span>
                <span
                  className='rowItem discriminator'
                  style={{
                    display: 'inline-block',
                    width: 'fit-content',
                    color: '#efff0a',
                  }}
                >
                  #{focusedTeammateState.discriminator}
                </span>
                {`\u00a0from\u00a0`}
                <span
                  className='rowItem'
                  style={{
                    display: 'inline-block',
                    width: 'fit-content',
                    color: '#efff0a',
                  }}
                >
                  {sessionState.currentTeam.name}
                </span>
              </p>
              <ul className='modalList'>
                <p>These effects will occur...</p>
                <li>{`${focusedTeammateState.username} will be removed from all projects of ${sessionState.currentTeam.name}`}</li>
                <li>{`Tickets assigned to ${focusedTeammateState.username} in any project of ${sessionState.currentTeam.name} will be set to "Unassigned"`}</li>
                <li>{`${focusedTeammateState.username} will not be able to visit the ${sessionState.currentTeam.name} team's page unless they are invited back`}</li>
              </ul>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className='button modalButton modalButtonCancel'
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRemoveTeammate()}
                  className='button modalButton modalButtonConfirm'
                >
                  Confirm
                </button>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          open={isRoleModalOpen}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box className='modalBoxContainer'>
            <div className='modalBox'>
              <p
                style={{ color: 'white' }}
                onClick={() => setIsModalOpen(false)}
              >
                {`Are you sure you want to ${roleUpdateType.toLowerCase()}\u00a0`}
                <span
                  className='rowItem username'
                  style={{
                    display: 'inline-block',
                    width: 'fit-content',
                    color: '#efff0a',
                  }}
                >
                  {focusedTeammateState.username}
                </span>
                <span
                  className='rowItem discriminator'
                  style={{
                    display: 'inline-block',
                    width: 'fit-content',
                    color: '#efff0a',
                  }}
                >
                  #{focusedTeammateState.discriminator}
                </span>
                <span
                  className='rowItem'
                  style={{ display: 'inline-block', width: 'fit-content' }}
                >
                  {`\u00a0to a`}
                </span>
                <span
                  className='rowItem'
                  style={{
                    display: 'inline-block',
                    width: 'fit-content',
                    color: '#efff0a',
                  }}
                >
                  {`\u00a0${potentialNewTeamRole}`}
                </span>
                {`\u00a0role on\u00a0`}
                <span
                  className='rowItem'
                  style={{
                    display: 'inline-block',
                    width: 'fit-content',
                    color: '#efff0a',
                  }}
                >
                  {sessionState.currentTeam.name}
                </span>
              </p>
              <ul className='modalList'>
                <p>These effects will occur...</p>
                {roleUpdateType === 'Demote' && (
                  <>
                    <li>
                      {focusedTeammateState.username} will no longer be able to
                      invite people to {sessionState.currentTeam.name}
                    </li>
                    <li>
                      {focusedTeammateState.username} will no longer be able to
                      create projects for {sessionState.currentTeam.name}
                    </li>
                    <li>
                      {focusedTeammateState.username} will no longer be able to
                      access the information on the team page
                    </li>
                    <li>
                      {focusedTeammateState.username} will still have Project
                      Lead permissions for any project they currently lead
                    </li>
                  </>
                )}
                {roleUpdateType === 'Promote' && (
                  <>
                    <li>
                      {focusedTeammateState.username} will be able to invite
                      people to {sessionState.currentTeam.name}
                    </li>
                    <li>
                      {focusedTeammateState.username} will be able to access the
                      information on the {sessionState.currentTeam.name} team
                      page
                    </li>
                    <li>
                      {focusedTeammateState.username} will be able to create
                      projects in {sessionState.currentTeam.name} for which they
                      would have Project Lead permissions
                    </li>
                  </>
                )}
              </ul>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <button
                  onClick={() => setIsRoleModalOpen(false)}
                  className='button modalButton modalButtonCancel'
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateTeammateRole()}
                  className='button modalButton modalButtonConfirm'
                >
                  Confirm
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </>
    );
  }
}
