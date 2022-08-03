import React from 'react';
import { useSelector } from 'react-redux';
import { priorityTranslation } from '../../../Services/translateTicketPriority';
import { ticket } from '../../ComponentInterfaces/ticket';
import { statusTranslation } from '../../../Services/translateTicketStatus';
import { State } from '../../../Redux/reducers';

interface Props extends ticket {
  focusedTicketID: number;
}

export default function ticketListItem(props: Props) {
  let priority: string = priorityTranslation.translateTicketPriorityBack(
    props.priority
  );
  let status: string = statusTranslation.translateTicketStatusBack(
    props.resolution_status
  );
  let chosenTicketClass: string = '';

  function checkIfAssignee(assignee: any): any {
    return assignee ? true : false;
  }
  let isAssignee = checkIfAssignee(props.assignee_user_discriminator);

  function handleTicketSelect(ticket: any) {
    props.setFocusedTicket(ticket);
  }

  if (props.ticket_id === props.focusedTicketID) {
    chosenTicketClass = 'ChosenTicket';
  }

  return (
    <div
      className={`listItem listRow ${chosenTicketClass} hoverGrey scaleYonHover`}
      style={{
        cursor: 'pointer',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
      }}
      onClick={() => handleTicketSelect(props)}
    >
      <div className='listRowSection leftSection'>
        <span className='ticketListTitle'>{props.title}</span>
      </div>
      <div className='listRowSection rightSection'>
        <span className='rowItem'>
          <p
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              margin: '0px',
            }}
          >
            {props.project_name}
          </p>
        </span>
        <span className='rowItem'>{status}</span>
        <span className='rowItem'>{priority}</span>
      </div>
    </div>
  );
}
