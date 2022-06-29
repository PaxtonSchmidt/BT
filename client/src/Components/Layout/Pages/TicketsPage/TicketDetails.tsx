import React from 'react'
import { useSelector } from 'react-redux';
import { object } from 'yup';
import { priorityTranslation } from '../../../../Services/translateTicketPriority';
import { focusedTicket } from '../../../../Redux/interfaces/ticket';
import { State } from '../../../../Redux/reducers';

export default function TicketDetails() {
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    let dateCreated = focusedTicketState.date_created?.toString().substring(0, 10);
    let priority = priorityTranslation.translateTicketPriorityBack(focusedTicketState.priority)    

    let isAssigneeNull = focusedTicketState.assignee_username !== null 
    return (
    <div id='openFormDetailsHeight' className='ticketDetailsContainer fadeIn '>
        <h4 className='header'>{focusedTicketState.title}</h4>
        <div className='ticketDetailsRow' >
            <div className='detailsColumn'>
                <div className='ticketDetailItemContainer'>
                    <div className='ticketDetailItem'>
                        <span className='detailLabel'>Submitter:</span>
                        <span className='detailUsername'>{`${focusedTicketState.author_username}`} </span>
                        <span className='detailDiscriminator discriminator'>#{focusedTicketState.author_discriminator}</span>
                        <span className='detailLabel' style={{marginLeft: '10px'}}>Created:</span>
                        <span>{dateCreated}</span>
                    </div>
                </div>    
                <div className='ticketDetailItemContainer'>
                    <div className='ticketDetailItem'>
                        <span className='detailLabel'>Project:</span>
                        <span>{focusedTicketState.project_name}</span>
                        {isAssigneeNull ?
                        <>
                        <span className='detailLabel'  style={{marginLeft: '20px'}}>Assignee:</span>
                        <span className='detailUsername'>{`${focusedTicketState.assignee_username}`} </span>
                        <span className='detailDiscriminator discriminator'>#{focusedTicketState.assignee_user_discriminator}</span>
                        </>
                        : <></>
                        }
                    </div>
                </div>    
                <div className='ticketDetailItemContainer'>
                    <div className='ticketDetailItem'>
                        <span className='detailLabel'>Priority:</span>
                        <span>{priority}</span>
                        <span className='detailLabel' style={{marginLeft: '20px'}}>Status:</span>
                        <span>Awaiting Review</span>
                    </div>
                </div>       
            </div>
            <div id='detailsDescription' className='detailsColumn descriptionBottom detailsDescription'>
                <p className='ticketDescriptionArea'>{focusedTicketState.description}</p>
            </div>
        </div>
    </div>
    )
}