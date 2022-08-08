import React from 'react';
import { priorityTranslation } from '../../../Services/translateTicketPriority';
import { ticket } from '../../ComponentInterfaces/ticket';
import { statusTranslation } from '../../../Services/translateTicketStatus';
import { useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';
import { BreakPoints } from '../Breakpoints';
import { sorts } from '../../ComponentInterfaces/sorts';

interface Props extends ticket {
  focusedTicketID: number;
  sortedBy: string;
  windowWidth: number;
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

  function getSortedDetail(){
    if(props.sortedBy === sorts.status){
      return <span className='ticketRowItem' >{status}</span>
    } else if(props.sortedBy === sorts.project){
      return <span className='ticketRowItem' >
      <p style={{textOverflow: 'ellipsis', overflow: 'hidden', margin: '0px'}}>
        {props.project_name}
      </p>
    </span>
    } else if(props.sortedBy === sorts.priority){
      return <span className='ticketRowItem' >{priority}</span>
    } else if(props.sortedBy === sorts.title){
      return <span className='ticketRowItem' >{priority}</span>
    } else {
      return <></>
    }
  }

  return (
    <div
      className={`ticketListRow ${chosenTicketClass} ${props.windowWidth < BreakPoints.tablet && 'ticketListRowSM'} hoverGrey scaleYonHover`}
      style={{
        cursor: 'pointer',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        paddingRight: '0px',
        height: '35px'
      }}
      onClick={() => handleTicketSelect(props)}>

      {props.windowWidth >= BreakPoints.tablet 
      ? <>
        <span className='ticketRowItem' style={{textAlign: 'left'}}>{props.title}</span>
        <span className='ticketRowItem'>
          <p style={{textOverflow: 'ellipsis', overflow: 'hidden', margin: '0px'}}>
            {props.project_name}
          </p>
        </span>
        <span className='ticketRowItem'>{status}</span>
        <span className='ticketRowItem'>{priority}</span>
      </>
      :
      <>
      <span className='ticketRowItem' style={{textAlign: 'left'}}>{props.title}</span>
      {getSortedDetail()}
      </>
      }

    </div>
  );
}
