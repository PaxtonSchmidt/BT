import React from 'react';
import { Container } from 'react-bootstrap';
import TicketForm from '../../../Library/Forms/TicketForm';

export default function FormAndManage() {
    return(
        <Container className='pageBodyContainer2 '>
            <div className='formAndManage'>
                <TicketForm />
            </div>   
        </Container>
    )
}