import React from 'react';
import { Container } from 'react-bootstrap';
import TicketForm from '../../../Library/Forms/TicketForm';
import TicketComments from './TicketComments';
import TicketDetails from './TicketDetails';

export default function CommentsAndDetails() {
    
    return(
        <Container className='pageBodyContainer2 '>
            <div className='formAndDetails'>
                <TicketDetails />
                <TicketComments />
            </div>   
        </Container>
    )
}