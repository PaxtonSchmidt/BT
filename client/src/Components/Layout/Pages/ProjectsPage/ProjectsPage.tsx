import React from 'react';
import { Container } from 'react-bootstrap';
import ProjectForm from '../../../Library/Forms/ProjectForm';

export default function ProjectsPage() {
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