import React from 'react';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import InviteToTeamForm from '../../../Library/Forms/inviteToTeamForm';

interface Props {
    isLoggedIn: boolean;
}

export default function Dashboard(isLoggedIn: Props) {
    if(isLoggedIn.isLoggedIn === true) {
        return(
            <div className='pageContentContainer'>
                <div className='pageHeaderContainer'>
                    <h1 className='pageHeader'>TEAM</h1>
                    <Container className='pageBodyContainer3'>
                        <InviteToTeamForm /> 
                    </Container>
                </div>
            </div>
        )
    }
    return <Navigate to='/login' />
    
}