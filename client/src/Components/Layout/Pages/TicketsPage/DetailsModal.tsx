import Modal from '@mui/material/Modal'
import React, { SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Ticket } from '../../../../API/interfaces/ticket'
import { FocusedTicketActionCreators } from '../../../../Redux'
import TicketDetails from './TicketDetails'

interface Props {
    isOpen: boolean,
    setIsFormOpen: React.Dispatch<SetStateAction<boolean>>
    setIsDetailsModalOpen: React.Dispatch<SetStateAction<boolean>>
}




export const DetailsModal: React.FC<Props> = ({ isOpen, setIsFormOpen, setIsDetailsModalOpen }) => {
    const dispatch = useDispatch();
    const { resetFocusedTicket } = bindActionCreators(FocusedTicketActionCreators, dispatch);

    let nullTicket: Ticket = {
        title: '',
        description: '',
        project: '',
        assignee: null,
        priority: '',
        resolution_status: ''
    }
      
    useEffect(()=>{
        resetFocusedTicket()
        setIsDetailsModalOpen(false)
    }, [])

    function handleClose() {
        setIsDetailsModalOpen(false)
        resetFocusedTicket()
    }

    return (
        <Modal 
            open={isOpen} 
            onClose={handleClose}
            className = 'DetailsModal'
            >
            <TicketDetails setIsChatModalOpen={setIsFormOpen} closeDetailsModal={handleClose} isModalVersion={true} />
        </Modal>
    )   
}