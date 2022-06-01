import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import postLogin from '../../../API/Requests/Login/PostLogin';
import { authService } from '../../../API/Services/AuthService';
import { Claims } from '../../../API/interfaces/claims';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import gitHub from '../../Images/Icons/github.svg';
import { NewUser } from '../../../API/interfaces/NewUser';

export default function SignUpForm() {
    let navigate = useNavigate();

    async function handleSubmit(data: NewUser) {
        if(data.password !== data.confirmPass){
            return console.log('passwords dont match') //fire toasts maybe
        }if(data.discriminator > 9999 || data.discriminator < 1){
            return console.log('please put a number between 1 and 9999')
        }
        let attemptResult = await authService.signUp(data);
        console.log(attemptResult)
        if(attemptResult === 200){
            navigate('/login')
        } else if(attemptResult === 400){
            console.log('Email already taken')
            // <SomethingWentWrongToast />
        } else {
            console.log(attemptResult);
        }
    }

    
    function handleGoBack() {
        navigate('/login')
    }
return(
        <div className='loginForm' style={{width: '550px'}}>
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
                        <form onSubmit={handleSubmit} onBlur={handleBlur}>
                            
                        <div className='formContainer' >
                            <h4 className='header'>Sign Up</h4>
                            <TextField
                                label='Email'
                                type='text'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='loginFormComponent'
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
                                className='loginFormComponent'
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
                                className='loginFormComponent'
                                name='discriminator'
                                variant='standard'
                                color='info'
                                required />
                            <TextField 
                                name='bio' 
                                value={values.bio} 
                                label='Bio' 
                                className='loginFormComponent' 
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
                                className='loginFormComponent' 
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
                                className='loginFormComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                required />
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                            <button type='reset'
                                onClick={handleGoBack}
                                className='button bottomButtons'
                                style={{ margin: '2px 2px 0px 0px'}}>
                                Back to Login
                            </button>
                            <button type='submit'
                                name='login'
                                className='button bottomButtons submitButton' 
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
        </div>
    )
}








