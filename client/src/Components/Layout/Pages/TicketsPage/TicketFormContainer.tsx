import React, { Dispatch, SetStateAction, useState } from 'react';
import { Container } from 'react-bootstrap';
import TicketForm from '../../../Library/Forms/TicketForm';

interface Props{
    isExtended: boolean,
    setIsExtended: Dispatch<SetStateAction<boolean>>
}

export default function TicketFormContainer(props: Props) {
    let isTwisted: string = props.isExtended ? 'twist' : ''
    let isFormTransitioned: string = props.isExtended ? 'FormTransition' : ''

    return(
        <Container id='FormContainer' className='pageBodyContainer2 FormContainer fadeIn'>
            <div className='formLoadAnim'>
                <TicketForm isExtended={props.isExtended} setIsExtended={props.setIsExtended}/>
                <h1 onClick={()=>props.setIsExtended(!props.isExtended)} className='button svgSibling' style={{cursor: 'pointer', backgroundColor: 'transparent', marginBottom: '0px', marginLeft: '0px', paddingLeft: '5px'}}>Create Ticket</h1>
                <svg onClick={()=>props.setIsExtended(!props.isExtended)} id='bi-arrow-bar-down' xmlns="http://www.w3.org/2000/svg" width="100%" height="25" fill="currentColor" className={`bi bi-arrow-bar-down ${isTwisted}`} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
                </svg>  
            </div>   
        </Container>
    )
}