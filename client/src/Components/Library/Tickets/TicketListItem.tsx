import { copyFile } from 'fs';
import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { priorityTranslation } from '../../../Services/translateTicketPriority';
import { ticket } from '../../PropsInterfaces/ticket';
import { FocusedTicketActionCreators } from '../../../Redux';
import pencil from '../../Images/Icons/pencil-square.svg';

export default function ticketListItem(props: ticket) {
    //going to need some code that translates numerical indicators to meaning
    //things like transposePriorityFromNumToString();
    let dateUpdated: string = props.date_last_updated.toString().substring(0, 10);
    let dateCreated: string = props.date_created.toString().substring(0, 10);
    let priority: string = priorityTranslation.translateTicketPriorityBack(props.priority)

    function checkIfAssignee(assignee: any): any {return assignee ? true : false}
    let isAssignee = checkIfAssignee(props.assignee_user_discriminator)

    function handleTicketSelect(ticket: any){
        props.setFocusedTicket(ticket)
    }
    
    return(
        <div className='listItem listRow'>
            <div className='listRowSection leftSection'>
                <button className='ticketListItemButtonContainer scaleYonHover' onClick={() => handleTicketSelect(props)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square ticketListItemButton" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    <span className='ticketListTitle'>
                        {props.title}
                    </span>
                </button>
            </div>
            <div className='listRowSection rightSection'>
                <span className='rowItem' >
                    <p style={{textOverflow: 'ellipsis', overflow: 'hidden', margin: '0px'}}>
                    {props.project_name}
                    </p>
                </span>
                <span className='rowItem'>
                    Review
                </span>
                <span className='rowItem'>
                    {priority}
                </span>
            </div>
        </div>
    )
}