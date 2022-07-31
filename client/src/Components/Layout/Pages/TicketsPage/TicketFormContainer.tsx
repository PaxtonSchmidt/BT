import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertActionCreators } from '../../../../Redux';
import { State } from '../../../../Redux/reducers';
import TicketForm from '../../../Library/Forms/TicketForm';

interface Props{
    isExtended: boolean,
    setIsExtended: Dispatch<SetStateAction<boolean>>
}

export default function TicketFormContainer(props: Props) {
    const dispatch = useDispatch();
    const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators, dispatch)
    const sessionState = useSelector((state: State) => state.session)
    const [isTicketFormDisabled, setIsTicketFormDisabled] = useState<boolean>(false);
    let isTwisted: string = props.isExtended ? 'twist' : ''
    let isFormDisabled: string = isTicketFormDisabled ? 'disabled' : ''
   
    function checkIfAnyProjects(){
        let isAnyProject = false
        if(sessionState.currentTeam === undefined){return false}
        if(sessionState.currentTeam.projects.length === 0){
            isAnyProject = false
        } else {
            isAnyProject = true
        }
        return isAnyProject
    }
    useEffect(()=>{
        let anyProject = checkIfAnyProjects()
        setIsTicketFormDisabled(!anyProject)
    }, [sessionState])

    function handleSetIsExtended(){
        if(isTicketFormDisabled === false){
            props.setIsExtended(!props.isExtended)
        } else {
            fireAlert({
                isOpen: true,
                status: 0,
                message: 'You must be in a project to submit tickets...'
            })
            setTimeout(hideAlert, 6000);
        }
    }

    return(
        <Container id='FormContainer' className='pageBodyContainer2 FormContainer fadeIn' style={{borderBottom: `${isFormDisabled ? '1px solid #1a1a1a' : ''}`}}>
            <div className='formLoadAnim'>
                <TicketForm isExtended={props.isExtended} setIsExtended={props.setIsExtended}/>
                <h1 onClick={()=>handleSetIsExtended()} className='button svgSibling' style={{cursor: `${isTicketFormDisabled ? 'default' : 'pointer'}`, backgroundColor: 'transparent', marginBottom: '0px', marginLeft: '0px', paddingLeft: '5px', color: `${isTicketFormDisabled ? '#ffffff31' : ''}`}}>Create Ticket</h1>
                <svg onClick={()=>handleSetIsExtended()} id='bi-arrow-bar-down' xmlns="http://www.w3.org/2000/svg" width="100%" height="25" fill="currentColor" className={`bi bi-arrow-bar-down ${isTwisted} ${isFormDisabled}`} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
                </svg>  
            </div>   
        </Container>
    )
}