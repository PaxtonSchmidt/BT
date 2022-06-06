import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import postInviteToTeam from '../../../API/Requests/Invites/PostInviteToTeam';
import { useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';

export default function InviteToTeamForm() {
    const sessionState = useSelector((state: State) => state.session)
    let TeamName = sessionState.currentTeam?.name
    

return(
        <div style={{width: '700px'}}>
            <Formik 
                initialValues={{invitee: '',
                                discriminator: ''}}
                onSubmit={data => {
                    console.log(data) 
                    postInviteToTeam(data)
                }}
            >
            {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                //need to grab the team name somehow
                    return (
                        <form onSubmit={handleSubmit} onBlur={handleBlur}>
                            
                        <div className='formContainer' >
                            <h4 className='header'>Invite people to {TeamName}</h4>
                            <TextField
                                label='Username'
                                type='text'
                                value={values.invitee}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='addToTeamFormComponent'
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
                                className='loginFormComponent'
                                name='discriminator'
                                variant='standard'
                                color='info'
                                required />
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                            <button type='submit'
                                name='addToTeam'
                                className='button bottomButtons submitButton' 
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
        </div>
    )
}







