import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import InviteToTeamForm from '../../../Library/Forms/inviteToTeamForm';
import TeamMemberList from '../../../Library/Teams/TeamMemberList';

interface Props {
    isTeamSelected: boolean;
}

export default function ManageTeamPage( {isTeamSelected} : Props) {
    const loginState = useSelector((state: State) => state.login)
    
    if(loginState === 1) {
        if(isTeamSelected === true) {
            return(
            <div className='pageContentContainer fa'>
                <div className='pageHeaderContainer'>
                    <Container className='pageBodyContainer3'>
                        <InviteToTeamForm /> 
                        <TeamMemberList />
                    </Container>
                </div>
            </div>
            )
        } return <Navigate to='/selectTeam' />
    }
    
    return <Navigate to='/login' />
    
}