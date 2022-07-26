import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Formik, FormikValues } from 'formik';
import { MenuItem, TextField } from '@mui/material';
import postTicket from '../../../API/Requests/Tickets/PostTicket';
import { useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import putEditTicket from '../../../API/Requests/Tickets/PutEditTicket';
import { bindActionCreators } from 'redux';
import { AlertActionCreators, FocusedTicketActionCreators, TicketsActionCreators } from '../../../Redux';

interface Props{
    isExtended?: boolean,
    setIsExtended?: Dispatch<SetStateAction<boolean>>,
    setIsEditOpen?: any,
    isEditMode?: boolean
}

export default function TicketForm(props: Props) { 
    let dispatch = useDispatch();
    const { updateFocusedTicket, editFocusedTicket } = bindActionCreators(FocusedTicketActionCreators, dispatch)
    const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators, dispatch)
    const { addTicket, editTicket } = bindActionCreators(TicketsActionCreators, dispatch)
    const [chosenProject, setChosenProject] = useState('');
    const [isDisabled, setIsDisabled] = useState(!props.isEditMode);
    const sessionState = useSelector((state: State) => state.session)
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    const ticketsState = useSelector((state: State) => state.tickets)
    const [isDirty, setIsDirty] = useState(false)
    const formRef = useRef<FormikValues>() as any;
    let projects = sessionState.currentTeam?.projects;
    let intendedProject: any = projects?.filter((project: any) => project.name === chosenProject)[0]
    let projectValues = projects?.map((project: any) => project.name)
    let userValues = intendedProject?.project_members.map((member: any) => member)
    let isFormTransitioned: string = props.isExtended === true ? 'FormTransition' : ''

    if(props.isEditMode){
        intendedProject = projects?.filter((project: any) => project.name === focusedTicketState.project_name)[0]
    }
    let initialUser = ''
    if(props.isEditMode){
        userValues = intendedProject?.project_members.map((member: any) => member)
    }
    if(userValues){
        userValues.unshift({username: 'none', discriminator: null, project_id: focusedTicketState.project_id, role_id: -1})
    }

    if(props.isEditMode && userValues){
        let userIDX = userValues.findIndex((user: any) => {
            if(user.username === focusedTicketState.assignee_username && user.discriminator === focusedTicketState.assignee_user_discriminator){
                return true
            }
        })
        initialUser = userValues[userIDX]
    }

    const priority = [
        {id: 1, descriptor: 'high'}, 
        {id: 2, descriptor: 'medium'}, 
        {id: 3, descriptor: 'low'}
    ]
    const status = [
        {id: 1, descriptor: 'Unassigned'}, 
        {id: 2, descriptor: 'Assigned'}, 
        {id: 3, descriptor: 'Investigating'}, 
        {id: 4, descriptor: 'Reviewing'}, 
        {id: 5, descriptor: 'Closed'}
    ]
    const handleReset = () => {
        if(formRef.current && isDirty === false){
            formRef.current.handleReset()
        }
    }
    props.isExtended ? console.log('') : handleReset()
    let initialData: any = {
        title: '',
        description: '',
        project: '',
        assignee: '',
        priority: '',
        resolution_status: ''}
        
    function setDataToFocusedTicket() {
            let editInitialData = {
                title: `${focusedTicketState.title}`,
                description: `${focusedTicketState.description}`,
                project: `${focusedTicketState.project_name}`,
                assignee: initialUser,
                priority: `${focusedTicketState.priority}`,
                resolution_status: `${focusedTicketState.resolution_status}`,
                ticket_id: focusedTicketState.ticket_id
            }
            initialData = editInitialData
    }
    
    if(props.isEditMode){
        setDataToFocusedTicket()
    }
return(     
    <Formik 
        initialValues={initialData}
        onSubmit={(data, { resetForm }) => {
            data.resolution_status = parseInt(data.resolution_status)
            data.priority = parseInt(data.priority)
            if(data.title.length > 50){
                fireAlert({
                    isOpen: true,
                    status: 0,
                    message: 'Max title length is 50 characters...'
                })
                setTimeout(hideAlert, 6000)
                return 
            } else if (data.description.length > 1000){
                fireAlert({
                    isOpen: true,
                    status: 0,
                    message: 'Max description length is 1000 characters...'
                })
                setTimeout(hideAlert, 6000)
                return 
            } else{
                if(!props.isEditMode){
                    async function handleSubmitTicket(){
                        let response = await postTicket(data)
                        console.log(response.body.ticket)
                        if(response.status !== 200){
                            fireAlert({
                                isOpen: true,
                                status: response.status,
                                message: response.body.message
                            })
                            setTimeout(hideAlert, 6000)
                        } else {
                            if(props.setIsExtended){
                                props.setIsExtended(false)
                            }
                            updateFocusedTicket(response.body.ticket)
                            addTicket(response.body.ticket)
                            resetForm()
                        }
                    }
                    handleSubmitTicket();
                } else{
                    async function handleEditTicket(){
                        let response = await putEditTicket(data, focusedTicketState.ticket_id, focusedTicketState.project_id)
                        if(response.status !== 200){
                            fireAlert({
                                isOpen: true,
                                status: response.status,
                                message: response.body.message
                            })
                            setTimeout(hideAlert, 6000)
                        } else {
                            editTicket(data)
                            editFocusedTicket(data)
                            resetForm()
                            props.setIsEditOpen(false)
                        }
                    }
                    handleEditTicket();
                }
            }
        }}
        innerRef={formRef}
    >
    {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
            return (
                
                <form id='ticketForm' className={`fadeIn form ${isFormTransitioned}`}  style={{width: 'fit-content'}} onSubmit={handleSubmit} onBlur={handleBlur} onChange={handleChange}>
                    
                    <div className='formContainer '>           
                        <div className='formSection formInputsContainer'>
                            <TextField
                                disabled={props.isEditMode}
                                label='Title'
                                type='text'
                                value={values.title}
                                onChange={(e)=>{setIsDirty(true); handleChange(e)}}
                                onBlur={handleBlur}
                                className='formComponent'
                                name='title'
                                variant='standard'
                                color='info'
                                required />
                            <TextField select 
                                name='priority' 
                                defaultValue={''} 
                                value={values.priority} 
                                label='Priority' 
                                className='formComponent' 
                                color='info' 
                                variant='standard' 
                                onBlur={handleBlur('priority')} 
                                onChange={(e)=>{setIsDirty(true); handleChange(e)}} 
                                sx={{ width: '200px' }}>
                                {priority.map((priority, index) => {
                                    return (
                                        <MenuItem key={priority.id} value={priority.id} id='priority'>{priority.descriptor}</MenuItem>
                                    );
                                })}
                            </TextField>
                            <TextField 
                                disabled={props.isEditMode}
                                select 
                                name='project' 
                                defaultValue={''} 
                                value={values.project}  
                                label='Project' 
                                className='formComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={e => {
                                    setIsDirty(true)
                                    handleChange(e)
                                    setChosenProject(e.target.value);
                                    setIsDisabled(false)
                                }} 
                                onBlur={handleBlur} 
                                sx={{ width: '200px' }}
                                required>
                                    <p style={{height: '0px', margin: '0px'}}></p>
                                {projectValues?.map((project: any, index: number) => 
                                [
                                    <MenuItem key={index} value={project} id='project'>{project}</MenuItem>
                                ]
                                )}
                            </TextField>
                            <TextField 
                                disabled={isDisabled}
                                select  
                                name='assignee' 
                                defaultValue={''} 
                                value={values.assignee} 
                                label='Assignee' 
                                className='formComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={(e)=>{setIsDirty(true); handleChange(e)}} 
                                onBlur={handleBlur} 
                                sx={{ width: '200px'}}>
                                    <p style={{height: '0px', margin: '0px'}}></p>
                                {userValues?.map((member: any, index: any) => {
                                    let isNullOption: string = member.username === 'none' && member.discriminator === null ? '' : '#'
                                    return (
                                        <MenuItem key={index} value={member} id='user'>{member.username} {isNullOption}{member.discriminator}</MenuItem>
                                    );
                                })}
                            </TextField>
                            <TextField 
                                select  
                                name='resolution_status' 
                                defaultValue={''} 
                                value={values.resolution_status} 
                                label='Status' 
                                className='formComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={(e)=>{setIsDirty(true); handleChange(e)}} 
                                onBlur={handleBlur} 
                                sx={{ width: '200px'}}>
                                    <p style={{height: '0px', margin: '0px'}}></p>
                                {status?.map((status: any) => {
                                    return (
                                        <MenuItem key={status.id} value={status.id} id='status'>{status.descriptor}</MenuItem>
                                    );
                                })}
                            </TextField>
                        </div>
                        <div className='formSection formInputsContainer' >
                            <TextField
                                label='Description'
                                type='text'
                                value={values.description}
                                onChange={(e)=> {setIsDirty(true); handleChange(e)}}
                                onBlur={handleBlur}
                                className='formComponent'
                                sx={{ color: '#ffffff' }}
                                name='description'
                                variant='standard'
                                color='info'
                                multiline
                                required />
                        </div>
                    </div>
                    
                    
                    
                
                <div className='formButtonsContainer'>
                    <button type='reset'
                        onClick={e => {
                            if(props.setIsEditOpen){
                                props.setIsEditOpen()
                            } else if(props.setIsExtended) {
                                props.setIsExtended(false)
                            }
                            setIsDisabled(true)
                            handleReset(e)
                        }}
                        className='button bottomButton bottomButtons cancelButton'
                        style={{ margin: '2px 2px 0px 0px' }}>
                        X
                    </button>
                    <button type='submit'
                        name='submit'
                        className='button bottomButton bottomButtons submitButton' 
                        style={{
                            margin: '2px 0px 0px 0px'
                        }}>
                        Submit
                    </button>
                </div> 
                
                
                </form>
            );
        }}
    </Formik>
    )
}
