import { useSelect } from '@mui/base'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../../Redux/reducers'
import ProjectsPage from '../../Layout/Pages/ProjectsPage/ProjectsPage'
import ProjectMembersListItem from './ProjectMembersListItem'
let deepClone = require('lodash.clonedeep')

export default function ProjectMembersList() {
    const [members, setMembers] = useState([]);
    const sessionState = useSelector((state: State) => state.session)
    const focusedProjectState = useSelector((state: State) => state.focusedProject)
    //was shallow copying session state so any changes to the copy also changed the state
    let projects = deepClone(sessionState.currentTeam?.projects)
    
    //if all user projects are selected, loop through each project's members list 
    //if the member is already on the component memberList, check if their role is higher for the current project
    //if it is, set their role to that one, if its not, do nothing.
    useEffect(() => {
        function createProjectMembersList(projects: any){
            if(focusedProjectState.name === 'All'){
                let newMembersList: any = [];

                projects.forEach((project: any) => project.project_members.forEach((member: any) => {
                    let index = newMembersList.findIndex((object: any) => {
                        return object.username === member.username
                    })
                    if(index !== -1){
                        if(member.role_id < newMembersList[index].role_id){
                            newMembersList[index].role_id = member.role_id 
                        }
                    } else {
                        newMembersList.push(member)
                    }
                }))
                return setMembers(newMembersList)
            } else {
                let newMembersList: any = [];
                //if a project is selected, map each member to the component newMembersList
                let project = projects.find((project: any) => project.name === focusedProjectState.name)
                project?.project_members.forEach((member: any) => newMembersList.push(member))
                return setMembers(newMembersList)
            }
        }
        createProjectMembersList(projects)
    }, [focusedProjectState])
    return (
        <>
            <div className='listRow' style={{marginTop: '5px', width: 'calc(100% - 20px)'}}>      
                <div className='memberListRowSection fadeIn' style={{textAlign: 'center'}}>
                    <span className='rowItem'>
                        Member
                    </span>
                </div>
                <div className='memberListRowSection fadeIn' style={{textAlign: 'center'}}>
                    <span className='rowItem'>
                        Role
                    </span>
                </div>
            </div>

            <div id='list'  className='list projectMembersList componentGlow fadeIn'>
                {members.map((member: any, index: any) =>
                    //docs say its not ideal to use the index for the key
                    //however it is necessary here
                    <ProjectMembersListItem key={index} member={member} /> 
                )}
            </div>
        </>
    )
}
    


