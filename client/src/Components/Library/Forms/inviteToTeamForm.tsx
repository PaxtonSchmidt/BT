import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import postProject from '../../../API/Requests/PostProject';
import postAddToTeam from '../../../API/Requests/PostAddToTeam';

export default function InviteToTeamForm() {
return(
        <div style={{width: '700px'}}>
            <Formik 
                initialValues={{invitee: ''}}
                onSubmit={data => {
                    console.log(data) 
                    postAddToTeam(data)
                }}
            >
            {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                //need to grab the team name somehow
                    return (
                        <form onSubmit={handleSubmit} onBlur={handleBlur}>
                            
                        <div className='formContainer' >
                            <h4 className='header'>Add People to Your Team</h4>
                            <TextField
                                label='invitee'
                                type='text'
                                value={values.invitee}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='addToTeamFormComponent'
                                name='invitee'
                                variant='standard'
                                color='info'
                                required />
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                            <button type='submit'
                                name='addToTeam'
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







