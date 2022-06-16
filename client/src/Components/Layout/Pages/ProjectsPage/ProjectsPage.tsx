import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import ProjectList from '../../../Library/Projects/ProjectList';
import ProjectFormContainer from './ProjectFormContainer';
import ProjectMembersManage from './ProjectMembersManage';

interface Props {
    isTeamSelected: boolean;
}

export default function ProjectsPage({ isTeamSelected }: Props) {
    const loginState = useSelector((state: State) => state.login)
    const sessionState = useSelector((state: State) => state.session)
    let [projectStats, setProjectStats] = useState({ticketAssigneeStats: [], ticketPriorityStats: {}, ticketStatusStats: {}});
    
    
    useEffect(() => {
        async function getProjectsStatistics(){
            let response: any = fetch('/projects/getProjectsStatistics', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            return setProjectStats(await response)
        }
        getProjectsStatistics();
    }, [])
    
    let assigneeStats = projectStats ? projectStats.ticketAssigneeStats : []
    
    if(sessionState.currentTeam === undefined){return <></>}
    let teamRole = sessionState?.currentTeam.team_role
    //if not logged in go to login, if team isnt selected go to select team
    if(loginState === 1) {
        if(isTeamSelected === true) {
            return(
                <div className='overflow'>
                    <div id='pageContentContainer' className='pageContentContainer  projectPageContent' >
                        <ProjectFormContainer/>
                    </div>
                    
                    <div className='pageBodyContainer4  fadeIn ' style={{flexDirection: 'row'}}>
                        <ProjectList />
                        <div className='projectPageBodyContainer1'>
                            <div className='projectPageBodyQuadrant'>
                                <ProjectMembersManage />
                            </div>
                            {/* <ProjectAssigneeChart data={assigneeStats} /> */}
                        </div>
                    </div>
                </div>
            )
        } return <Navigate to='/selectTeam' />
    }
    return <Navigate to='/login' />
}