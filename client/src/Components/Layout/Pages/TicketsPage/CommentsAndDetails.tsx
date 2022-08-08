import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { State } from '../../../../Redux/reducers';
import { BreakPoints } from '../../../Library/Breakpoints';
import TicketChat from '../../../Library/Tickets/TicketChat';
import TicketChatModal from '../../../Library/Tickets/TicketChatModal';
import TicketDetails from './TicketDetails';

export default function CommentsAndDetails() {
  const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const focusedTicketState = useSelector((state: State) => state.focusedTicket);
  let conditionalContainerStyles = windowWidth < BreakPoints.tablet 
  ? 'formAndDetailsSM' 
  : ''
  return (
    <Container className='pageBodyContainer2' style={windowWidth < BreakPoints.tablet ? {marginRight: '5px'} : {}}>
      <div className={`formAndDetails ${conditionalContainerStyles}`}>
        <TicketDetails />
        {windowWidth > BreakPoints.tablet ? <TicketChat setIsOpen={setIsModalOpen} /> : <TicketChatModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>}

        {windowWidth <= BreakPoints.tablet && focusedTicketState.ticket_id !== undefined
        && 
        <div onClick={()=>setIsModalOpen(true)} 
          className='hoverGrey'
          style={{display: 'flex', borderRadius:'5%', border: '1px solid #efff0a', height: '32px', width: 'fit-content', position: 'fixed', bottom: '10px', right:'10px', backgroundColor: '#222222', cursor: 'pointer', opacity: '100%', zIndex: '3'}}
          >
          <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop: '3px'}} width="24" height="24" fill="#efff0a" className="bi bi-chat-text" viewBox="0 0 16 16">
            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
            <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </div>}
      </div>
    </Container>
  );
}
