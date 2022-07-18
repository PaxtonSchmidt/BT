import { userInfo } from 'os';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedProjectActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import ProjectListItem from './ProjectListItem';

function ProjectList() {
    const dispatch = useDispatch();
    const { updateFocusedProject } = bindActionCreators(FocusedProjectActionCreators, dispatch)
    const focusedProjectState = useSelector((state: State) => state.focusedProject)
    const [filterToLeadingOnly, setFilterToLeadingOnly]= useState(false)
    const sessionState = useSelector((state: State) => state.session)
    let projectsList: any = [] 
    let currentUser = {
        username: sessionState.currentUser?.username,
        discriminator: sessionState.currentUser?.discriminator
    }
    

    if(filterToLeadingOnly === true){
        sessionState.currentTeam?.projects.forEach((project: any) => {
            let leaders: any = project.project_members.filter((member: any) => {if(member.role_id === 1 || member.role_id === 2){return true}})
            let index = leaders.findIndex((leader: any) => {
                if(leader.username === currentUser.username && leader.discriminator === currentUser.discriminator) {
                    return true
                }
            })
            //if the current user exists in the list of leader of each individual project, push that project onto the viewable project list for the current user
            if(index !== -1){
                projectsList.push(project.name)
            }
        })
    } else {
        sessionState.currentTeam?.projects.forEach((project: any) => projectsList.push(project.name))
    }

    let projectAllName = 'All'
    if(focusedProjectState.name === projectAllName){
        document.getElementById(projectAllName)?.classList.add('selectedProjectInList')
        document.getElementById(projectAllName)?.classList.remove('scaleYonHover')
    } else {
        document.getElementById(projectAllName)?.classList.remove('selectedProjectInList')
        document.getElementById(projectAllName)?.classList.add('scaleYonHover')
    }

    function checkView(){
        if(filterToLeadingOnly === true){
            return 'Viewing Projects You Lead'
        } else {
            return 'Viewing Your Projects'
        }
    }
    let WhichView = checkView()


    if(!projectsList){
        return<></>
    }else if(projectsList.length === 0 && filterToLeadingOnly === false){
        return <h4 style={{color: '#ffffff', marginTop: '5px', marginBottom: '5px', height: '20px'}}>Looks like you haven't been assigned to any projects yet</h4>
    }else{
        function handleWheel(e: any){
            let projectList = document.getElementById('projectList')
            if(projectList){    
                let width = projectList.clientWidth
                projectList!.scrollLeft += e.deltaY;
                let timer: any = console.log(projectList.scrollLeft)
            }      
        }
        
        //needs pagination
        return (
            <div onWheel={handleWheel} id='projectList'  className='sideScrollList componentGlow'>
                <div onClick={() => updateFocusedProject({name: 'All'})} className='sideScrollListItem scaleYonHover fadeIn selectedProjectInList' id={projectAllName}>
                    All
                </div>
                {projectsList!.map((project: any) =>
                    <ProjectListItem key={project} name={project} />
                )}
                <button className='filterProjectsToggle scaleYonHover' onClick={() => setFilterToLeadingOnly(!filterToLeadingOnly)}>{WhichView}</button>
            </div>
        )
    }
}
    

export default ProjectList;
