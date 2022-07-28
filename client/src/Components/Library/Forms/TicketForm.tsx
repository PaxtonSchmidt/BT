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

interface AssigneeValue {
    username: string,
    discriminator: number | null,
    role_id: number,
    project_id: number
}

export default function TicketForm(props: Props) { 
    let dispatch = useDispatch();
    const formRef: any = useRef();
    const { updateFocusedTicket, editFocusedTicket } = bindActionCreators(FocusedTicketActionCreators, dispatch)
    const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators, dispatch)
    const { addTicket, editTicket } = bindActionCreators(TicketsActionCreators, dispatch)
    const [isDisabled, setIsDisabled] = useState(!props.isEditMode);
    const sessionState = useSelector((state: State) => state.session)
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    const [intendedProject, setIntendedProject] = useState<any>();
    let projectValues = sessionState.currentTeam?.projects.map((project: any) => project.name)
    let isFormTransitioned: string = props.isExtended === true ? 'FormTransition' : ''
    let noAssignee: AssigneeValue = {username: 'none', discriminator: null, project_id: -1, role_id: -1}
    let assigneeValues: any[] = [noAssignee]

    useEffect(()=>{
        if(props.isEditMode){
            let project = sessionState.currentTeam.projects.filter((project: any) => project.name === focusedTicketState.project_name)[0]
            handleSetIntendedProject(project)  
        } 
    }, [])

    useEffect(() => {
        intendedProject && intendedProject.project_members.forEach((member: any) => assigneeValues.push(member)) 
        let assigneeIDX = assigneeValues.findIndex((assignee: AssigneeValue)=>{return assignee.username === focusedTicketState.assignee_username && assignee.discriminator === focusedTicketState.assignee_user_discriminator})
        if(props.isEditMode && formRef.current){
            formRef.current.setValues({
                title: `${focusedTicketState.title}`,
                description: `${focusedTicketState.description}`,
                project: `${focusedTicketState.project_name}`,
                assignee: assigneeValues[assigneeIDX],
                priority: `${focusedTicketState.priority}`,
                resolution_status: `${focusedTicketState.resolution_status}`,
                ticket_id: focusedTicketState.ticket_id
            })
        }
        formRef.current.setFieldValue("assignee", props.isEditMode ? assigneeValues[assigneeIDX] : noAssignee)
    }, [intendedProject, []])

    function handleSetIntendedProject(project: any){
        setIntendedProject(project)
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

    if(sessionState.currentTeam && sessionState.currentTeam.team_role === 1){
            console.log('asda')
    }

    function handleOnProjectSelect(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        let project = sessionState.currentTeam.projects.filter((project: any) => project.name === e.target.value)[0] 
        handleSetIntendedProject(project)
    }

    let initialData: any = {
        title: '',
        description: '',
        project: '',
        assignee: '',
        priority: '',
        resolution_status: ''
    }
    let fadeAnimationType: string = props.isEditMode ? 'fadeIn' : 'delayedFadeIn'
return(     
    <Formik 
        innerRef={formRef}
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
                        console.log(data)
                        let response = await postTicket(data)
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
                        console.log(data)
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
    >
    {({values, handleChange, handleBlur, handleSubmit, resetForm}) => {

            return (
                <form id='ticketForm' className={`${fadeAnimationType} form ${isFormTransitioned}`}  style={{width: 'fit-content'}} onSubmit={handleSubmit} onBlur={handleBlur} onChange={handleChange}>
                    <div className='formContainer '>           
                        <div className='formSection formInputsContainer'>
                            <TextField
                                disabled={props.isEditMode}
                                label='Title'
                                type='text'
                                value={values.title}
                                onChange={(e)=>{handleChange(e)}}
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
                                onChange={(e)=>{handleChange(e)}} 
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
                                value={values.project}  
                                label='Project' 
                                className='formComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={e => {
                                    handleChange(e)
                                    handleOnProjectSelect(e);
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
                                defaultValue={''}
                                select  
                                name='assignee' 
                                value={values.assignee} 
                                label='Assignee' 
                                className='formComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={(e)=>{handleChange(e)}} 
                                onBlur={handleBlur} 
                                sx={{ width: '200px'}}>
                                    <p style={{height: '0px', margin: '0px'}}></p>
                                {assigneeValues?.map((member: any, index: any) => {
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
                                onChange={(e)=>{handleChange(e)}} 
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
                                onChange={(e)=> {handleChange(e)}}
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
                        onClick={() => {
                            if(props.setIsEditOpen){
                                props.setIsEditOpen()
                            } else if(props.setIsExtended) {
                                props.setIsExtended(false)
                                resetForm()
                            }
                            setIsDisabled(true)
                            resetForm()
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
