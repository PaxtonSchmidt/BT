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
    const sessionState = useSelector((state: State) => state.session)
    
if(sessionState.currentTeam === undefined){return <></>}
//if you are not logged, go to login, if team is not selected, go to team select, if you are not the team owner, go to tickets
    if(loginState === 1) {
        if(isTeamSelected === true) {
            if(sessionState.currentTeam.team_role === 1){
                return(
                    <div className='pageContentContainer fa' style={{marginTop: '300px'}}>
                        <div className='pageHeaderContainer'>
                            <Container className='pageBodyContainer3'>
                                <InviteToTeamForm /> 
                                <p style={{color: 'white'}}>maybe show team overall ticket stats, team members list with a manage roles widget and invites or remove from team</p>
                                <TeamMemberList />
        
                            </Container>
                        </div>
                    </div>
                )
            } return <Navigate to='/tickets' />
        } return <Navigate to='/selectTeam' />
    } return <Navigate to='/login' />
}