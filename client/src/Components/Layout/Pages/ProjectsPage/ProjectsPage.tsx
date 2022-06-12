import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import ProjectList from '../../../Library/Projects/ProjectList';
import MetricsAndUsers from './MetricsAndUsers';
import ProjectFormContainer from './ProjectFormContainer';

interface Props {
    isTeamSelected: boolean;
}

export default function ProjectsPage({ isTeamSelected }: Props) {
    const loginState = useSelector((state: State) => state.login)

    //show data for tickets organized by priority, organized by status and organized by user
    
    if(loginState === 1) {
        if(isTeamSelected === true) {
            return(
                <div className='overflow'>
                    <div id='pageContentContainer' className='pageContentContainer  projectPageContent' >
                        <ProjectFormContainer/>
                        <MetricsAndUsers />
                    </div>
                        <ProjectList />
                </div>
            )
        } return <Navigate to='/selectTeam' />
    }
    return <Navigate to='/login' />
}