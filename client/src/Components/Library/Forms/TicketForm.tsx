import React, { useRef } from 'react';
import { Field, Formik } from 'formik';
import { InputLabel, MenuItem, Select, TextField, ThemeProvider } from '@mui/material';
import { theme } from '../../../theme';
import postTicket from '../../../API/Requests/Tickets/PostTicket';
import { useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';
import { useState } from 'react';

export default function TicketForm() { 
    let [chosenProject, setChosenProject] = useState('');
    let [isDisabled, setIsDisabled] = useState(true) 
    const sessionState = useSelector((state: State) => state.session)
    let projects = sessionState.currentTeam?.projects;

    let intendedProject: any = projects?.filter((project: any) => project.name === chosenProject)[0]

    let projectValues = projects?.map((project: any) => project.name)
    let userValues = intendedProject?.project_members.map((member: any) => member.username)
    const priority = ['high', 'medium', 'low']
return( 
        <div>
            
            <Formik 
                initialValues={{title: '',
                                description: '',
                                project: '',
                                assignee: '',
                                priority: ''}}
                onSubmit={data => {
                    console.log(data) 
                    postTicket(data)
                }}
                
            >
            {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                    return (
                        
                        <form onSubmit={handleSubmit} onBlur={handleBlur}>
                        <div className='formContainer'>
                        <h4 className='header'>Create Ticket</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <TextField
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
                                    {userValues?.map((name: string, index: any) => {
                                        return (
                                            <MenuItem key={index} value={name} id='user'>{name}</MenuItem>
                                        );
                                    })}
                                </TextField>
                            </div>
                            <div className='formSection' >
                                <TextField
                                    label='Description'
                                    type='text'
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className='formComponent formTextArea'
                                    sx={{ color: '#ffffff' }}
                                    name='description'
                                    variant='standard'
                                    color='info'
                                    multiline
                                    required />
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                            <button type='reset'
                                onClick={e => {
                                    setIsDisabled(true)
                                    handleReset(e)
                                }}
                                className='button bottomButtons cancelButton'
                                style={{ margin: '2px 2px 0px 0px' }}>
                                X
                            </button>
                            <button type='submit'
                                name='submit'
                                className='button bottomButtons submitButton' 
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
        </div>
    )
}

//title, description, project, assigned user,  priority 
