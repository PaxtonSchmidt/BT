import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { priorityTranslation } from '../../../../Services/translateTicketPriority';
import { State } from '../../../../Redux/reducers';
import { Modal } from '@mui/material';
import TicketForm from '../../../Library/Forms/TicketForm';
import { statusTranslation } from '../../../../Services/translateTicketStatus';
import moment from 'moment';
import { BreakPoints } from '../../../Library/Breakpoints';

interface Props{ 
  setIsChatModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  closeDetailsModal?: React.Dispatch<React.SetStateAction<boolean>>
  isModalVersion?: boolean;
}

export default function TicketDetails(props: Props) {
  const focusedTicketState = useSelector((state: State) => state.focusedTicket);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const sessionState = useSelector((state: State) => state.session);
  let priority = priorityTranslation.translateTicketPriorityBack(
    focusedTicketState.priority
  );
  let isAssigneeNull = focusedTicketState.assignee_user_discriminator === null;
  let assigneeUsername: string = isAssigneeNull
    ? 'none'
    : focusedTicketState.assignee_username;
  let assigneeDiscriminator: string = isAssigneeNull
    ? ''
    : focusedTicketState.assignee_user_discriminator;
  let isFocusedTicketUndefined: boolean =
    focusedTicketState.title === undefined;
  let isUserAllowedToEdit: boolean = false;
  const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth

  function handleSetIsModalOpen() {
    typeof focusedTicketState.ticket_id !== 'undefined' &&
      setIsEditModalOpen(!isEditModalOpen);
  }

  //if the user is the owner, they can edit the ticket
  //if the user_project role is 1 or 2, they can edit the ticket
  //if the user is the owner and they are on the project, their role_id is 1
  //if the user is the owner and they are not on the project, their role_id is 0, but they still have all perms, they just wont show in the project member list so they cant be assigned tickets and so on
  //if the user is a lead on the project, their role is 2
  //if the user is the assignee or author, they can edit the ticket
  if (sessionState && isFocusedTicketUndefined === false) {
    if (sessionState.currentTeam.team_role === 1) {
      isUserAllowedToEdit = true;
    } else if(focusedTicketState.assignee_username === sessionState.currentUser.username && focusedTicketState.assignee_user_discriminator === sessionState.currentUser.discriminator){
      isUserAllowedToEdit = true;
    } else {
      let projectIDX = sessionState.currentTeam.projects.findIndex(
        (project: any) => {
          if (
            project.project_id === focusedTicketState.project_id &&
            (project.role_id === 1 || project.role_id === 2)
          ) {
            return true;
          }
        }
      );
      if (projectIDX !== -1) {
        isUserAllowedToEdit = true;
      }
    }
  }
  
  function handleCloseModal(){
    if(props.closeDetailsModal){
      props.closeDetailsModal(false)
    }
  }

  return (
    <>
      {isFocusedTicketUndefined ? (
        <div className='ticketDetailsContainer' >
          {props.isModalVersion ? <div className='closeModalButton' onClick={()=>handleCloseModal()}>Back to ticket list</div> : <></>}
          <p
            className='delayedFadeIn'
            style={{
              color: 'ffffff31',
              marginTop: '14px',
              marginBottom: 'auto'
            }}
          >
            Please select a ticket
          </p>
        </div>
      ) : (
        <div id='openFormDetailsHeight' className='ticketDetailsContainer' style={props.isModalVersion ? {height: '100%', textAlign: 'center'} : {}}>
          <h4 className='header fadeIn ' style={{ cursor: 'default' }}>
            {focusedTicketState.title}
            <span style={{fontSize: '12px', opacity:'30%', marginLeft: '10px', fontWeight: '300'}}>
             {moment(focusedTicketState.date_created).format(
              'MMMM Do'
            )}
            </span>
          </h4>
          {props.isModalVersion ? <div className='closeModalButton' onClick={()=>handleCloseModal()}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='#efff0a'
              className='bi bi-x-square'
              viewBox='0 0 16 16'
            >
              <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
              <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
            </svg>
            </div> 
            : <></>}
          <div className='ticketDetailsRow'>
              <div className='ticketDetailItemContainer'>
                <div className={`ticketDetailItem`}>
                  <div className='detailItemSection'>
                    <span className='detailUsername fadeIn '>
                      {`${focusedTicketState.author_username}`}{' '}
                    </span>
                    <span className='discriminator fadeIn ' style={{marginBottom: '0px', marginTop: '3px'}}>
                      #{focusedTicketState.author_discriminator}
                    </span>
                  </div>
                  <div className='detailItemSection'>
                    <span className='detailLabel fadeIn' >
                      Assignee:
                    </span>
                    <span className='detailUsername fadeIn '>
                      {`${assigneeUsername}`}{' '}
                    </span>
                    <span className='discriminator fadeIn' style={{marginBottom: '0px', marginTop: '3px'}}>
                      {isAssigneeNull ? '' : '#'}
                      {assigneeDiscriminator}
                    </span>
                  </div>
                  {isUserAllowedToEdit && (
                  <div  className='ticketListItemButtonContainer fadeIn scaleYonHover'onClick={() => handleSetIsModalOpen()} style={{marginLeft: 'auto'}}>
                      <>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='#efff0a'
                          style={{}}
                          viewBox='0 0 16 16'
                        >
                          <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                          <path
                            fillRule='evenodd'
                            d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
                          />
                        </svg>
                        <p style={{ marginTop: '2px', marginBottom: '0px' }}>
                          {'\u00a0'}Edit
                        </p>
                      </>
                  </div>
                  )}
                </div>
              </div>
              <div className='ticketDetailItemContainer '>
                <div className='ticketDetailItem'>

                <div className='detailItemSection'>
                    <span className='detailLabel fadeIn '>Priority:</span>
                    <span className='fadeIn '>{priority}</span>
                  </div>
                  
                  <div className='detailItemSection' style={{textAlign: 'center'}}>
                    <span className='detailLabel fadeIn' >
                      Status:
                    </span>
                    <span className='fadeIn '>
                      {statusTranslation.translateTicketStatusBack(
                        focusedTicketState.resolution_status
                      )}
                    </span>
                  </div>

                </div>
              </div>

              <div className='ticketDetailItemContainer'>
                <div  className='ticketDetailItem' >

                <div className='detailItemSection' style={{display: 'flex', textOverflow: 'ellipsis' }}>
                  <span className='detailLabel fadeIn '>
                    <span> Project:</span>
                  </span>
                  <span className='fadeIn '>
                    <p style={{ textOverflow: 'ellipsis', margin: '0px', whiteSpace: 'nowrap', }} >
                      {focusedTicketState.project_name}
                    </p>
                  </span>
                </div>
                <span></span>
                {windowWidth <= BreakPoints.tablet && focusedTicketState.ticket_id !== undefined &&
                <div  className='ticketListItemButtonContainer fadeIn scaleYonHover'onClick={()=>props.setIsChatModalOpen(true)} style={{marginLeft: 'auto'}}>
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop: '0px'}} width="16" height="16" fill="#efff0a" className="bi bi-chat-text" viewBox="0 0 16 16">
                      <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                      <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    <p style={{ marginTop: '2px', marginBottom: '0px' }}>
                      {'\u00a0'}Chat
                    </p>
                  </>
                </div>}
                  

                  

                </div>
              </div>
            <div
              id='detailsDescription'
              className='detailsColumn descriptionBottom detailsDescription '
              style={props.isModalVersion ? {height: '100%'} : {}}
            >
              <p
                className='ticketDescriptionArea fadeIn '
                style={{ width: '100%' }}
              >
                {focusedTicketState.description}
              </p>
            </div>
          </div>
        </div>
      )}
      <Modal
        open={isEditModalOpen}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TicketForm setIsEditOpen={handleSetIsModalOpen} isEditMode={true} />
      </Modal>
    </>
  );
}
