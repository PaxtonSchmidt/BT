import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ProjectForm from '../../../Library/Forms/ProjectForm';

export default function ProjectFormContainer() {
    const [isExtended, setIsExtended] = useState(false)

    function handleOpenProjectForm(){
        if(isExtended === false){
            document.getElementById('pageContentContainer')!.classList.add('FormContainerTransition');
            document.getElementById('bi-arrow-bar-down')!.classList.add('twist');       
        } else{
            document.getElementById('pageContentContainer')!.classList.remove('FormContainerTransition');
            document.getElementById('bi-arrow-bar-down')!.classList.remove('twist');        
        }
        setIsExtended(!isExtended)
    }
    return(
        <Container id='FormContainer' className='pageBodyContainer2 FormContainer fadeIn'>
            <div className='formLoadAnim'>
                <ProjectForm isExtended={isExtended}/>
                <h1 onClick={handleOpenProjectForm} className='button svgSibling' style={{width: '100%', cursor: 'pointer', backgroundColor: 'transparent', marginBottom: '0px', marginTop: '3px'}}>Create Project</h1>
                <svg onClick={handleOpenProjectForm} id='bi-arrow-bar-down' xmlns="http://www.w3.org/2000/svg" width="100%" height="25" fill="currentColor" className="bi bi-arrow-bar-down" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
                </svg>  
            </div>
        </Container>
    )
}