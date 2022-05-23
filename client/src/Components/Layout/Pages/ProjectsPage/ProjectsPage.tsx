import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import ProjectForm from '../../../Library/Forms/ProjectForm';

interface Props {
    isTeamSelected: boolean;
}

export default function ProjectsPage({ isTeamSelected }: Props) {
    const loginState = useSelector((state: State) => state.login)
    console.log(loginState)
    
    if(loginState === 1) {
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