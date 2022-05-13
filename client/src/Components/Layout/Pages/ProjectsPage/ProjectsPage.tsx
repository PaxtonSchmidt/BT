import React from 'react';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import ProjectForm from '../../../Library/Forms/ProjectForm';

interface Props {
    isLoggedIn: boolean;
}

export default function ProjectsPage(isLoggedIn: Props) {
    if(isLoggedIn.isLoggedIn === true) {
        return(
            <div className='pageContentContainer'>
                <div className='pageHeaderContainer'>
                    <h1 className='pageHeader'>PROJECTS</h1>
                    <Container className='pageBodyContainer3'>
                    <ProjectForm />
                    </Container>
                </div>
            </div>
        )
    }
    return <Navigate to='/login' />
}