import React from 'react';
import { Container } from 'react-bootstrap';
import TicketForm from '../../../Library/Forms/TicketForm';
import TicketDetails from './TicketDetails';

export default function FormAndDetails() {
    
    return(
        <Container className='pageBodyContainer2 '>
            <div className='formAndDetails'>
                <TicketForm />
                <TicketDetails />
            </div>   
        </Container>
    )
}