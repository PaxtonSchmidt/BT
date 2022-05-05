import React from 'react';
import { Field, Formik } from 'formik';
import { InputLabel, MenuItem, Select, TextField, ThemeProvider } from '@mui/material';
import { theme } from '../../../theme';

export default function TicketForm() {
    const projects = ['project 1', 'project 2', 'project 3', 'project 4', 'project 5'] //an array of all projects belonging to the team you're currently working for
    const users = ['self', 'user', 'user 2', 'Users 3'] //an array of users on your team that are assigned to the currently selected project

    const priority = ['high', 'medium', 'low']
    return( 
        <ThemeProvider theme={theme}> 
            <div>
                <h4 className='header'>Create Ticket</h4>
                <Formik 
                    initialValues={{title: '',
                                    description: '',
                                    project: '',
                                    user: '',
                                    priority: ''}}
                    onSubmit={data => {
                        console.log(data);
                    }}
                >
                {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                        return (
                            <form onSubmit={handleSubmit} onBlur={handleBlur}>
                            <div className='formContainer'>
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
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        sx={{ width: '200px' }}>
                                        {priority.map((priority, index) => {
                                            return (
                                                <MenuItem key={index} value={priority} id='priority'>{priority}</MenuItem>
                                            );
                                        })}
                                    </TextField>
                                    <TextField select 
                                        name='project' 
                                        defaultValue={''} 
                                        value={values.project}  
                                        label='Project' 
                                        className='formComponent' 
                                        color='info' 
                                        variant='standard' 
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        sx={{ width: '200px' }}
                                        required>
                                        {projects.map((project, index) => {
                                            return (
                                                <MenuItem key={index} value={project} id='project'>{project}</MenuItem>
                                            );
                                        })}
                                    </TextField>
                                    <TextField select  
                                        name='user' 
                                        defaultValue={''} 
                                        value={values.user} 
                                        label='Assignee' 
                                        className='formComponent' 
                                        color='info' 
                                        variant='standard' 
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        sx={{ width: '200px' }}>
                                        {users.map((user, index) => {
                                            return (
                                                <MenuItem key={index} value={user} id='user'>{user}</MenuItem>
                                            );
                                        })}
                                    </TextField>
                                </div>
                                <div className='formSection'>
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
                                    onClick={handleReset}
                                    className='button bottomButtons cancelButton'
                                    style={{ margin: '2px 2px 0px 0px' }}>
                                    X
                                </button>
                                <button type='submit'
                                    name='submit'
                                    className='button bottomButtons submitButton' 
                                    style={{
                                        borderRadius: '5px 0px 5px 5px',
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
        </ThemeProvider>
    )
}

//title, description, project, assigned user,  priority 
