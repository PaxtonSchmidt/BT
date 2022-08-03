import React from 'react';
import { Container } from 'react-bootstrap';
import TicketForm from '../../../Library/Forms/TicketForm';
import TicketNoteList from '../../../Library/Tickets/TicketNoteList';
import TicketNotes from '../../../Library/Tickets/TicketNoteList';
import TicketDetails from './TicketDetails';

export default function CommentsAndDetails() {
  return (
    <Container className='pageBodyContainer2 '>
      <div className='formAndDetails'>
        <TicketDetails />
        <TicketNoteList />
      </div>
    </Container>
  );
}
