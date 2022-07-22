import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { priorityTranslation } from '../../../../Services/translateTicketPriority';
import { State } from '../../../../Redux/reducers';
import { Modal } from '@mui/material';
import TicketForm from '../../../Library/Forms/TicketForm';

export default function TicketDetails() {
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    let dateCreated = focusedTicketState.date_created?.toString().substring(0, 10);
    let priority = priorityTranslation.translateTicketPriorityBack(focusedTicketState.priority)    
    let isAssigneeNull = focusedTicketState.assignee_username !== null 
    let isFocusedTicketUndefined: boolean = focusedTicketState.title === undefined
    
    function handleSetIsModalOpen(){
        typeof focusedTicketState.ticket_id !== 'undefined' && setIsEditModalOpen(!isEditModalOpen)
    }

    return (
    <>
    {isFocusedTicketUndefined ?
        <div className='ticketDetailsContainer'><p className='delayedFadeIn' style={{color: 'ffffff31', marginTop: '14px', marginBottom: 'auto'}}>Please select a ticket</p></div>
    :
    <div id='openFormDetailsHeight' className='ticketDetailsContainer fadeIn '>
        {/* <div className='ticketListItemButtonContainer ticketEditButton' onClick={()=>handleSetIsModalOpen()}>
            <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" className="bi bi-pencil-square ticketListItemButton" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
            <p style={{marginTop: '5px', marginBottom: '0px'}}>{'\u00a0'}Edit</p>
        </div> */}
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
    <Modal
        open={isEditModalOpen}
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <TicketForm setIsEditOpen={handleSetIsModalOpen} isEditMode={true} />
    </Modal>
    </>
    )
}