import React, {useState, useEffect} from 'react';
import { ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedTicketActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import ProjectListItem from './ProjectListItem';

function ProjectList() {
    const sessionState = useSelector((state: State) => state.session)
    let projectsList: any = ['All'] 
    sessionState.currentTeam?.projects.forEach((project: any) => projectsList.push(project.name))
    
   
   


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
                    <ProjectListItem isSelected={false} key={project} name={project} />
                )}
            </div>
            
        )
    }
}
    

export default ProjectList;
