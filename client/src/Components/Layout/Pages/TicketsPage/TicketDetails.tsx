import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { priorityTranslation } from '../../../../Services/translateTicketPriority';
import { State } from '../../../../Redux/reducers';
import { Modal } from '@mui/material';
import TicketForm from '../../../Library/Forms/TicketForm';
import { statusTranslation } from '../../../../Services/translateTicketStatus';
import moment from 'moment';

export default function TicketDetails() {
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
  let conditionalMarginRight: string = isUserAllowedToEdit ? 'auto' : '';
  return (
    <>
      {isFocusedTicketUndefined ? (
        <div className='ticketDetailsContainer'>
          <p
            className='delayedFadeIn'
            style={{
              color: 'ffffff31',
              marginTop: '14px',
              marginBottom: 'auto',
            }}
          >
            Please select a ticket
          </p>
        </div>
      ) : (
        <div id='openFormDetailsHeight' className='ticketDetailsContainer '>
          <h4 className='header fadeIn ' style={{ cursor: 'default' }}>
            {focusedTicketState.title}
          </h4>
          <div className='ticketDetailsRow'>
            <div className='detailsColumn'>
              <div className='ticketDetailItemContainer'>
                <div className='ticketDetailItem'>
                  <span className='detailUsername fadeIn '>
                    {`${focusedTicketState.author_username}`}{' '}
                  </span>
                  <span className='discriminator fadeIn '>
                    #{focusedTicketState.author_discriminator}
                  </span>
                  <span
                    className='fadeIn '
                    style={{
                      marginLeft: 'auto',
                      marginRight: `${conditionalMarginRight}`,
                    }}
                  >
                    {moment(focusedTicketState.date_created).format(
                      'MMMM Do h:mma'
                    )}
                  </span>
                  <div
                    className='ticketListItemButtonContainer fadeIn scaleYonHover'
                    onClick={() => handleSetIsModalOpen()}
                  >
                    {isUserAllowedToEdit && (
                      <>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-pencil-square ticketListItemButton'
                          viewBox='0 0 16 16'
                        >
                          <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                          <path
                            fillRule='evenodd'
                            d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
                          />
                        </svg>
                        <p style={{ marginTop: '5px', marginBottom: '0px' }}>
                          {'\u00a0'}Edit
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='ticketDetailItemContainer '>
                <div className='ticketDetailItem'>
                  <div
                    style={{
                      width: '50%',
                      display: 'flex',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <span className='detailLabel fadeIn '>
                      <span> Project:</span>
                    </span>
                    <span className='fadeIn '>
                      <p
                        style={{
                          textOverflow: 'ellipsis',
                          margin: '0px',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {focusedTicketState.project_name}
                      </p>
                    </span>
                  </div>

                  <span
                    className='detailLabel fadeIn '
                    style={{ marginLeft: 'auto' }}
                  >
                    Assignee:
                  </span>
                  <span className='detailUsername fadeIn '>
                    {`${assigneeUsername}`}{' '}
                  </span>
                  <span className='discriminator fadeIn '>
                    {isAssigneeNull ? '' : '#'}
                    {assigneeDiscriminator}
                  </span>
                </div>
              </div>

              <div className='ticketDetailItemContainer'>
                <div
                  className='ticketDetailItem'
                  style={{ justifyContent: 'space-between' }}
                >
                  <span className='detailLabel fadeIn '>Priority:</span>
                  <span className='fadeIn '>{priority}</span>

                  <span
                    className='detailLabel fadeIn '
                    style={{ marginLeft: 'auto' }}
                  >
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
            <div
              id='detailsDescription'
              className='detailsColumn descriptionBottom detailsDescription '
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
