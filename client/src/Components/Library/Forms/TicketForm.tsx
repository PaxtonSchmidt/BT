import React, { useRef } from 'react';
import { Formik, FormikValues } from 'formik';
import { MenuItem, TextField } from '@mui/material';
import postTicket from '../../../API/Requests/Tickets/PostTicket';
import { useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';
import { useState } from 'react';
import putEditTicket from '../../../API/Requests/Tickets/PutEditTicket';

interface Props{
    isExtended?: boolean,
    handleSetIsExtended?: any,
    setIsEditOpen?: any,
    isEditMode?: boolean
}

export default function TicketForm(props: Props) { 
    const [chosenProject, setChosenProject] = useState('');
    const [isDisabled, setIsDisabled] = useState(!props.isEditMode);
    const sessionState = useSelector((state: State) => state.session)
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    const formRef = useRef<FormikValues>() as any;
    let projects = sessionState.currentTeam?.projects;
    let intendedProject: any = projects?.filter((project: any) => project.name === chosenProject)[0]
    let projectValues = projects?.map((project: any) => project.name)
    let userValues = intendedProject?.project_members.map((member: any) => member)

    if(props.isEditMode){
        intendedProject = projects?.filter((project: any) => project.name === focusedTicketState.project_name)[0]
    }
    let initialUser = ''
    if(props.isEditMode){
        userValues = intendedProject?.project_members.map((member: any) => member)
    }
    if(props.isEditMode && userValues){
        let userIDX = userValues.findIndex((user: any) => {
            if(user.username === focusedTicketState.assignee_username && user.discriminator === focusedTicketState.assignee_user_discriminator){
                return true
            }
        })
        initialUser = userValues[userIDX]
    }
    const priority = ['high', 'medium', 'low']

    const handleReset = () => {
        if(formRef.current ){
            formRef.current.handleReset()
        }
    }
    props.isExtended ? console.log('') : handleReset()
    let initialData = {
        title: '',
        description: '',
        project: '',
        assignee: '',
        priority: ''}
    if(props.isEditMode){
        initialData.title = `${focusedTicketState.title}`;
        initialData.description = `${focusedTicketState.description}`;
        initialData.project = `${focusedTicketState.project_name}`;
        initialData.assignee = initialUser
        initialData.priority = priority[focusedTicketState.priority]
    }
return(     
    <Formik 
        initialValues={initialData}
        onSubmit={data => {
            if(data.title.length > 50){
                return console.log('Your title is too long...')
            } else if (data.description.length > 1000){
                return console.log('Your description is too long...')
            } else{
                if(!props.isEditMode){
                    return postTicket(data)
                } else{
                    return putEditTicket(data, focusedTicketState.ticket_id)
                }
            }
        }}
        innerRef={formRef}
    >
    {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
            return (
                
                <form id='ticketForm' className='fadeIn form ' style={{width: 'fit-content'}} onSubmit={handleSubmit} onBlur={handleBlur} onChange={handleChange}>
                    
                    <div className='formContainer '>           
                        <div className='formSection formInputsContainer'>
                            <TextField
                                disabled={props.isEditMode}
                                label='Title'
                                type='text'
                                value={values.title}
                                onChange={handleChange}
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
                                onChange={handleChange} 
                                sx={{ width: '200px' }}>
                                {priority.map((priority, index) => {
                                    return (
                                        <MenuItem key={index} value={priority} id='priority'>{priority}</MenuItem>
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
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                sx={{ width: '200px'}}>
                                    <p style={{height: '0px', margin: '0px'}}></p>
                                {userValues?.map((member: any, index: any) => {
                                    return (
                                        <MenuItem key={index} value={member} id='user'>{member.username} #{member.discriminator}</MenuItem>
                                    );
                                })}
                            </TextField>
                        </div>
                        <div className='formSection formInputsContainer' >
                            <TextField
                                label='Description'
                                type='text'
                                value={values.description}
                                onChange={handleChange}
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
