import React, {useState, useEffect} from 'react';
import { ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedTicketActionCreators } from '../../../Redux';
import ProjectListItem from './ProjectListItem';

function ProjectList() {
    let [projects, setProjects] = useState();
    let projectsSeed: any = ['All', 'Client', 'User Interface and User Experience', 'Security Issues', 'Server', 'Features', 'tree', 'On', 'Tw', 'thre', 'ne', 'wo', 'hree', ];
   
   

    useEffect(() => {
        async function getProjects(){
            let response: any = fetch('/projects/getProjects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            console.log(await response)
            return await response
        }
        getProjects();
    }, [])//empty array passed as second argument to useEffect can be used to tell the hook to run at least once without causing infinite loop


    if(!projectsSeed){
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
        <Container className='pageBodyContainer1  fadeIn ' style={{flexDirection: 'row'}}>
            <div onWheel={handleWheel} id='projectList'  className='sideScrollList componentGlow'>
                {projectsSeed!.map((project: any) =>
                    <div key={project} className='sideScrollListItem scaleYonHover' ><h5 key={project}>{project}</h5></div>
                    
                    // <ProjectListItem />
                )}
            </div>
        </Container>
            
        )
    }
}
    

export default ProjectList;
