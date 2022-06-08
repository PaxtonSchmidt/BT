import React from 'react'
import { useSelector } from 'react-redux';
import { priorityTranslation } from '../../../../API/Services/translateTicketPriority';
import { focusedTicket } from '../../../../Redux/interfaces/ticket';
import { State } from '../../../../Redux/reducers';

export default function TicketDetails() {
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    console.log(focusedTicketState)
    
    if(focusedTicketState.ticketID === undefined){
        return (<></>)
    } else {
        let dateCreated: any = focusedTicketState.dateCreated.toString().substring(0, 10);
        let priority: any = priorityTranslation.translateTicketPriorityBack(focusedTicketState.priority)

        return (
            <div className='ticketDetailsContainer fadeIn'>
                <h4 className='header'>{focusedTicketState.title}</h4>
                <div className='ticketDetailsRow' >
                   <div className='detailsColumn'>
                        <div className='ticketDetailItemContainer'>
                            <div className='ticketDetailItem'>
                                <span className='detailLabel'>Author:</span>
                                <span className='detailUsername'>{`${focusedTicketState.authorUsername} \u00A0`} </span>
                                <span className='detailDiscriminator'>#{focusedTicketState.authorDiscriminator}</span>
                            </div>
                        </div>    
                        <div className='ticketDetailItemContainer'>
                            <div className='ticketDetailItem'>
                                <span className='detailLabel'>Project:</span>
                                <span>{focusedTicketState.relevantProjectName}</span>
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
                        <div className='ticketDetailItemContainer'>
                            <div className='ticketDetailItem'>
                                <span className='detailLabel'>Assignee:</span>
                                <span className='detailUsername'>{`${focusedTicketState.assigneeUsername} \u00A0`} </span>
                                <span className='detailDiscriminator'>#{focusedTicketState.assigneeDiscriminator}</span>
                            </div>
                        </div>    
                        <div className='ticketDetailItemContainer'>
                            <div className='ticketDetailItem'>
                                <span className='detailLabel'>Created:</span>
                                <span>{dateCreated}</span>
                            </div>
                        </div>    
                    </div>
                    <div className='detailsColumn '>
                        <p className='ticketDescriptionArea'>{focusedTicketState.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}