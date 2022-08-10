import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedTicketActionCreators } from '../../../../Redux';
import { State } from '../../../../Redux/reducers';
import { BreakPoints } from '../../../Library/Breakpoints';
import TicketChat from '../../../Library/Tickets/TicketChat';
import TicketChatModal from '../../../Library/Tickets/TicketChatModal';
import { DetailsModal } from './DetailsModal';
import TicketDetails from './TicketDetails';

export default function CommentsAndDetails() {
  const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false)
  const focusedTicketState = useSelector((state: State) => state.focusedTicket);
  let conditionalContainerStyles = windowWidth <= BreakPoints.tablet 
  ? 'formAndDetailsSM' 
  : ''

  useEffect(() => {
    if(focusedTicketState.ticket_id !== undefined){
      setIsDetailsModalOpen(true)
    } else {
      setIsDetailsModalOpen(false)
    }
  }, [focusedTicketState, []])
  return (
    <Container className='pageBodyContainer2' style={windowWidth <= BreakPoints.tablet ? {marginRight: '5px'} : {}}>
      <div className={`formAndDetails ${conditionalContainerStyles}`} style={{marginLeft: `${windowWidth < BreakPoints.tablet ? '5px' : '' }`, borderBottom: `${windowWidth <= BreakPoints.mobile ? 'none' : ''}`}}>

        {windowWidth > BreakPoints.mobile 
        ? <TicketDetails setIsChatModalOpen={setIsChatModalOpen} />
        : <DetailsModal setIsDetailsModalOpen={setIsDetailsModalOpen} isOpen={isDetailsModalOpen} setIsFormOpen={setIsChatModalOpen} />}

        {windowWidth > BreakPoints.tablet 
        ? <TicketChat /> 
        : <TicketChatModal isOpen={isChatModalOpen} setIsOpen={setIsChatModalOpen}/>}
        
      </div>
    </Container>
  );
}
