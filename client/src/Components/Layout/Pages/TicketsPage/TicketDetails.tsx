import React from 'react'
import { useSelector } from 'react-redux';
import { priorityTranslation } from '../../../../Services/translateTicketPriority';
import { State } from '../../../../Redux/reducers';

export default function TicketDetails() {
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    let dateCreated = focusedTicketState.date_created?.toString().substring(0, 10);
    let priority = priorityTranslation.translateTicketPriorityBack(focusedTicketState.priority)    

    let isAssigneeNull = focusedTicketState.assignee_username !== null 
    let isFocusedTicketUndefined: boolean = focusedTicketState.title === undefined
    return (
    <>
    {isFocusedTicketUndefined ?
        <div className='ticketDetailsContainer'><p className='delayedFadeIn' style={{color: 'ffffff31', marginTop: '14px', marginBottom: 'auto'}}>Select a ticket to see its data</p></div>
    :
    <div id='openFormDetailsHeight' className='ticketDetailsContainer fadeIn '>
        <h4 className='header' style={{cursor: 'default'}}>{focusedTicketState.title}</h4>
        <div className='ticketDetailsRow' >
            <div className='detailsColumn'>
                <div className='ticketDetailItemContainer'>
                    <div className='ticketDetailItem'>
                        <span className='detailLabel'>Submitter:</span>
                        <span className='detailUsername'>{`${focusedTicketState.author_username}`} </span>
                        <span className='detailDiscriminator discriminator'>#{focusedTicketState.author_discriminator}</span>
                        <span className='detailLabel' style={{marginLeft: 'auto'}}>Created:</span>
                        <span>{dateCreated}</span>
                    </div>
                </div>    
                <div className='ticketDetailItemContainer'>
                    <div className='ticketDetailItem'>
                        <div style={{width: '50%', display: 'flex'}} >
                            <span className='detailLabel' style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                <span> Project:</span>   
                            </span>
                            <span>
                                <p style={{textOverflow: 'ellipsis', margin:'0px', overflow: 'hidden'}}>
                                {focusedTicketState.project_name}
                                </p>
                            </span>
                        </div>
                        
                        
                        {isAssigneeNull ?
                        <>
                        <span className='detailLabel'  style={{marginLeft: 'auto'}}>Assignee:</span>
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
                        <span className='detailLabel' style={{marginLeft: 'auto'}}>Status:</span>
                        <span>Awaiting Review</span>
                    </div>
                </div>       
            </div>
            <div id='detailsDescription' className='detailsColumn descriptionBottom detailsDescription'>
                <p className='ticketDescriptionArea' style={{width: '100%'}}>{focusedTicketState.description}</p>
            </div>
        </div>
    </div>
    }
    </>
    )
}