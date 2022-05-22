import React from 'react';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import InviteToTeamForm from '../../../Library/Forms/inviteToTeamForm';

interface Props {
    isLoggedIn: boolean;
    isTeamSelected: boolean;
}

export default function ManageTeamPage( {isLoggedIn, isTeamSelected} : Props) {
    if(isLoggedIn === true) {
        if(isTeamSelected === true) {
            return(
                <div className='pageContentContainer'>
                <div className='pageHeaderContainer'>
                    <Container className='pageBodyContainer3'>
                        <InviteToTeamForm /> 
                    </Container>
                </div>
            </div>
            )
        } return <Navigate to='/selectTeam' />
    }
    
    return <Navigate to='/login' />
    
}