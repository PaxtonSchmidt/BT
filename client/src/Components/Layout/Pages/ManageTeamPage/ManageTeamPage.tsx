import React from 'react';
import { Container } from 'react-bootstrap';
import InviteToTeamForm from '../../../Library/Forms/inviteToTeamForm';

export default function Dashboard() {
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