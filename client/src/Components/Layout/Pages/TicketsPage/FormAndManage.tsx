import React from 'react';
import { Container } from 'react-bootstrap';
import TicketForm from '../../../Library/Tickets/TicketForm';

export default function FormAndManage() {
    return(
        <Container className='pageBodyContainer2'>
            <div className='formAndManage'>
                <div style={{width: '80%'}}>
                    <TicketForm />
                </div>
            </div>   
        </Container>
    )
}