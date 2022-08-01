import React, { Dispatch, SetStateAction, useState } from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import postInviteToTeam from '../../../API/Requests/Invites/PostInviteToTeam';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertActionCreators } from '../../../Redux';

interface Props {
    isExtended: boolean,
    setIsExtended: Dispatch<SetStateAction<boolean>>
}

export default function InviteToTeamForm(props: Props) {
    const dispatch = useDispatch();
    const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators, dispatch)
    

return(
        <>
            <Formik 
                initialValues={{invitee: '',
                                discriminator: ''}}
                onSubmit={async (data, { resetForm }) => {
                    let response = await postInviteToTeam(data)
                    console.log(response)
                    response.status !== 200 ? 
                    (()=> {
                        fireAlert({
                            isOpen: true,
                            status: response.status,
                            message: response.body.message
                        })
                        setTimeout(hideAlert, 6000);
                    })()
                    : (()=>{
                        
                        props.setIsExtended(false)
                        resetForm()
                    })()
                }}
            >
            {({values, handleChange, handleBlur, handleSubmit, handleReset, resetForm}) => {
                //need to grab the team name somehow
                    return (
                        <form style={{width: 'fit-content'}} onSubmit={(e) => {
                            handleSubmit(e)
                            }} 
                            onBlur={handleBlur}
                            className='fadeIn'
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
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <button type='reset'
                                onClick={() => {
                                    resetForm()
                                    props.setIsExtended(false)
                                }}
                                className='button bottomButton bottomButtons cancelButton'
                                style={{ margin: '2px 2px 0px 0px' }}>
                                X
                            </button>
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







