import React from 'react';
import { Field, Formik } from 'formik';
import { InputLabel, MenuItem, Select, TextField, ThemeProvider } from '@mui/material';
import { theme } from '../../../theme';

export default function TicketForm() {
    const users = ['self user', 'user', 'user 2', 'Users 3']

    return( 
        <ThemeProvider theme={theme}> 
            <div>
                <h4 className='header'>Create Ticket</h4>
                <Formik 
                    initialValues={{title: '',
                                    description: '',
                                    project: '',
                                    user: ''}}
                    onSubmit={data => {
                        console.log(data);
                    }}
                >
                {({values, handleChange, handleBlur, handleSubmit}) => (
                    <form onSubmit={handleSubmit} onBlur={handleBlur} className='formContainer'>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div className='formInput'>   
                                    <TextField
                                    label='Title' 
                                    type='text' 
                                    value={values.title}     
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                    className='formInput' 
                                    name='title'
                                    variant='standard'
                                    color='info'
                                    required
                                    />
                            </div>
                            <div className='formInput' id='user' >
                                <TextField name='user' defaultValue={''} label='Assign' className='formInput' select color='info' variant='standard' onChange={handleChange} onBlur={handleBlur} sx={{width: '100%'}}>
                                {users.map((user, index) => {
                                return(
                                    <MenuItem key={index} value={user} id='user' >{user}</MenuItem>
                                );
                                })}
                                </TextField>
                            </div>  
                        </div>
                        <div className='formInput' style={{width: '90%'}}>
                            <TextField
                                label='Description' 
                                type='text' 
                                value={values.description} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                className='formInput formTextArea' 
                                sx={{ color: '#ffffff' }}
                                name='description'
                                variant='standard'
                                color='info'
                                multiline
                                required/>
                        </div>
                        <button type='submit' name='submit'>submit</button>
                    </form>
                )}
                </Formik>
            </div>
        </ThemeProvider>
    )
}

//title, description, project, assigned user,  priority 

{/* <div className='formInput'>
                                <Field
                                    className='formInput'
                                    sx={{minWidth: '120px'}}
                                    variant='standard'
                                    as={Select}
                                    type="select"
                                    name='projects'
                                    color='info'
                                    >
                                    <MenuItem value='project 1' >Project 1</MenuItem>
                                    <MenuItem value='project 2' >Project 2</MenuItem>
                                </Field>
                            </div> */}
                            {/* <div className='formInput'>
                                <Field
                                    className='formInput'
                                    sx={{minWidth: '120px'}}
                                    variant='standard'
                                    as={Select}
                                    type='select'
                                    name='assigned'
                                    color='info'
                                    defaultValue=''
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    >
                                    <MenuItem value='user 1' >user 1</MenuItem>
                                    <MenuItem value='user 2' >user 2</MenuItem>
                                </Field>
                            </div> */}