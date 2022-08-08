import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';
import Modal from '@mui/material/Modal';
import TicketChat from './TicketChat';

interface Props{ 
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TicketChatModal(props: Props) {
  const focusedTicketState = useSelector((state: State) => state.focusedTicket);

  return (
    <>
    <Modal open={props.isOpen} onClose={()=>{props.setIsOpen(false)}}  disableAutoFocus={true} >      
      <div
        className='ticketNoteListContainer'
        style={{ 
        transition: '0',
        height: '70vh',
        minHeight: '300px',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxHeight: '600px',
        marginTop: '50px',
        width: '90%',
        position: 'relative'
        }}
      >
        <h1 style={{color: 'white', textAlign: 'center', fontSize: '18px'}}>{`${focusedTicketState.title}`}</h1>
        <p style={{color: 'white', textAlign: 'center', fontSize: '14px', marginTop: '5px', marginBottom: '5px'}}>{`Use this chat to find a solution to the ticket`}</p>
        <div style={{position: 'absolute', right: '10px', top: '10px'}}>
          <svg
            onClick={() => props.setIsOpen(false)}
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='#efff0a'
            className='bi bi-x-square'
            viewBox='0 0 16 16'
          >
            <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
          </svg>
        </div>
        <TicketChat isModalChat={true}/>
      </div>
    </Modal>
    </>
  )
}

