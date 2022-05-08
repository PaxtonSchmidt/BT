import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import postProject from '../../../API/Requests/PostProject';

export default function ProjectForm() {
return(
        <div style={{width: '700px'}}>
            <Formik 
                initialValues={{name: '',
                                description: '',
                                teamName: 'Good Dev Company'}}
                onSubmit={data => {
                    console.log(data) 
                    postProject(data)
                }}
            >
            {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                //need to grab the team name somehow
                    return (
                        <form onSubmit={handleSubmit} onBlur={handleBlur}>
                            
                        <div className='formContainer' >
                            <h4 className='header'>New Project</h4>
                            <TextField
                                label='Name'
                                type='text'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='projectFormComponent'
                                name='name'
                                variant='standard'
                                color='info'
                                required />
                            <TextField 
                                name='description' 
                                value={values.description} 
                                label='Description' 
                                className='projectFormComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                required />
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                            <button type='submit'
                                name='project'
                                className='button bottomButtons submitButton' 
                                style={{
                                    borderRadius: '5px 0px 5px 5px',
                                    margin: '2px 0px 0px 0px'
                                }}>
                                Submit 
                            </button>
                        </div>
                        </form>
                    )}
                }
            </Formik>
        </div>
    )
}








