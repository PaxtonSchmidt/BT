import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import postInviteToTeam from '../../../API/Requests/Invites/PostInviteToTeam';
import { useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';

export default function InviteToTeamForm() {
    

return(
        <>
            <Formik 
                initialValues={{invitee: '',
                                discriminator: ''}}
                onSubmit={async data => {
                    console.log(data) 
                    if(await postInviteToTeam(data) === 200){
                        
                    }
                }}
            >
            {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                //need to grab the team name somehow
                    return (
                        <form style={{width: 'fit-content'}} onSubmit={(e) => {
                            handleSubmit(e)
                            }} 
                            onBlur={handleBlur}
                        >
                            
                        <div className='formContainer' >
                            <h4 className='header'>Invite people</h4>
                            <TextField
                                label='Username'
                                type='text'
                                value={values.invitee}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='formComponent'
                                name='invitee'
                                variant='standard'
                                color='info'
                                required />
                            <TextField
                                label='#0000'
                                type='number'
                                value={values.discriminator}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='formComponent'
                                name='discriminator'
                                variant='standard'
                                color='info'
                                required />
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                            <button 

                                type='submit'
                                name='addToTeam'
                                className='button bottomButton bottomButtons submitButton' 
                                style={{
                                    margin: '2px 0px 0px 0px'
                                }}>
                                Submit 
                            </button>
                        </div>
                        </form>
                    )}
                }
            </Formik>
        </>
    )
}







