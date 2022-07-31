import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import { authService } from '../../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import { NewUser } from '../../../API/interfaces/NewUser';
import { bindActionCreators } from 'redux';
import { AlertActionCreators } from '../../../Redux';
import { useDispatch } from 'react-redux';

export default function SignUpForm() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators, dispatch)

    async function handleSubmit(data: NewUser) {
        console.log('a')
        if(data.password !== data.confirmPass){
            fireAlert({
                isOpen: true,
                status: 0,
                message: 'Passwords dont match...'
            })
            return setTimeout(hideAlert, 6000);
        } else if(data.discriminator > 9999 || data.discriminator < 1){
            fireAlert({
                isOpen: true,
                status: 0,
                message: 'Please use a number between 1 and 9999'
            })
            return setTimeout(hideAlert, 6000);
        }
        let attemptResult = await authService.signUp(data);
        console.log(attemptResult)
        if(attemptResult.status === 200){
            console.log('got here')
            return navigate('/login')
        } else {
            console.log('asda')
            fireAlert({
                isOpen: true,
                status: attemptResult.status,
                message: attemptResult.body.message
            })
            setTimeout(hideAlert, 6000);
        }
    }

    
    function handleGoBack() {
        navigate('/login')
    }
return(
        <>
            <Formik 
                initialValues={{email: '',
                                username: '',
                                discriminator: 0,
                                password: '',
                                confirmPass: '',
                                bio: ''}}
                onSubmit={handleSubmit}
            >
            {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                    return (
                        <form  className='loginFormContainer' onSubmit={handleSubmit} onBlur={handleBlur}>
                            
                        <div className='formContainer' >
                            <h4 className='header'>Sign Up</h4>
                            <TextField
                                label='Email'
                                type='text'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='formComponent'
                                name='email'
                                variant='standard'
                                color='info'
                                required />
                            <TextField
                                label='Username'
                                type='text'
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='formComponent'
                                name='username'
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
                            <TextField 
                                name='bio' 
                                value={values.bio} 
                                label='Bio' 
                                className='formComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                />
                            <TextField 
                                type='password'
                                name='password' 
                                value={values.password} 
                                label='Password' 
                                className='formComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                required />
                            <TextField 
                                type='password'
                                name='confirmPass' 
                                value={values.confirmPass} 
                                label='Confirm Password' 
                                className='formComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                required />
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                            <button type='reset'
                                onClick={handleGoBack}
                                className='button bottomButton bottomButtons'
                                style={{ margin: '2px 2px 0px 0px'}}>
                                Back to Login
                            </button>
                            <button type='submit'
                                name='login'
                                className='button bottomButton bottomButtons submitButton' 
                                style={{
                                    margin: '2px 0px 0px 0px',
                                    justifySelf: 'right'
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








