import { userInfo } from 'os';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedProjectActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import ProjectListItem from './ProjectListItem';

function ProjectList() {
    const [filterToLeadingOnly, setFilterToLeadingOnly]= useState(false)
    const sessionState = useSelector((state: State) => state.session)
    let projectsList: any = ['All'] 
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
    
 
    function checkView(){
        if(filterToLeadingOnly === true){
            return 'Viewing Projects You Lead'
        } else {
            return 'Viewing Projects You Are In'
        }
    }
    let WhichView = checkView()


    if(!projectsList){
        return<></>
    }else{

        function handleWheel(e: any){
            let projectList = document.getElementById('projectList')
            if(projectList){    
                let width = projectList.clientWidth
                
                projectList!.scrollLeft += e.deltaY;
                let timer: any = console.log(projectList.scrollLeft)
                // console.log(width)
                // console.log(projectList.scrollWidth)
            }      
        }
        
        //needs pagination
        return (
            <div onWheel={handleWheel} id='projectList'  className='sideScrollList componentGlow'>
                {projectsList!.map((project: any) =>
                    <ProjectListItem key={project} name={project} />
                )}
                <button className='filterProjectsToggle scaleYonHover' onClick={() => setFilterToLeadingOnly(!filterToLeadingOnly)}>{WhichView}</button>
            </div>
            
        )
    }
}
    

export default ProjectList;
