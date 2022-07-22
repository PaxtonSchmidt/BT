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
        <div className='listItem listRow' style={{cursor: 'pointer'}} onClick={() => handleTicketSelect(props)}>
            <div className='listRowSection leftSection'>
                <button className='ticketListItemButtonContainer scaleYonHover' >
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