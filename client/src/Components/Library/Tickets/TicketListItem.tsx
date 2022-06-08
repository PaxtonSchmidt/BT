import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { priorityTranslation } from '../../../API/Services/translateTicketPriority';
import { ticket } from '../../../PropsInterfaces/ticket';
import { FocusedTicketActionCreators } from '../../../Redux';
import pencil from '../../Images/Icons/pencil-square.svg';

export default function ticketListItem(props: ticket) {
    //going to need some code that translates numerical indicators to meaning
    //things like transposePriorityFromNumToString();
    let dateUpdated: string = props.dateLastUpdated.toString().substring(0, 10);
    let dateCreated: string = props.dateCreated.toString().substring(0, 10);
    let priority: string = priorityTranslation.translateTicketPriorityBack(props.priority)

    function handleTicketSelect(ticket: any){
        props.setFocusedTicket(ticket)
    }
    
    return(
        <div className='listItem ticketListItem'>
            <div style={{display: 'flex', height: '40px'}} >
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
            <div>
                <span className='listColumn'>
                    {props.relevantProjectName}
                </span>
                <span className='listColumn'>
                    {props.assigneeUsername} #{props.assigneeDiscriminator}
                </span>
                <span className='listColumn'>
                    Awaiting Review
                </span>
                <span className='listColumn'>
                    {dateCreated}
                </span>
                <span className='listColumn priority' style={{marginRight: '20px'}}>
                    {priority}
                </span>
            </div>
        </div>
    )
}