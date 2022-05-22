import React from 'react';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import ProjectForm from '../../../Library/Forms/ProjectForm';

interface Props {
    isLoggedIn: boolean;
    isTeamSelected: boolean;
}

export default function ProjectsPage({ isLoggedIn, isTeamSelected }: Props) {
    if(isLoggedIn === true) {
        if(isTeamSelected === true) {
            return(
                <div className='pageContentContainer'>
                    <div className='pageHeaderContainer'>
                        <Container className='pageBodyContainer3'>
                        <ProjectForm />
                        </Container>
                    </div>
                </div>
            )
        } return <Navigate to='/selectTeam' />
    }
    return <Navigate to='/login' />
}