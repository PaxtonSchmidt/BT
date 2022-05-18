import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import postLogin from '../../../API/Requests/PostLogin';
import { authService } from '../../../API/Services/AuthService';
import { Claims } from '../../../API/interfaces/claims';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import gitHub from '../../Images/Icons/github.svg';
import { NewUser } from '../../../API/interfaces/NewUser';

export default function LoginForm() {
    let navigate = useNavigate();
    function oops() {
        return <h1>oops</h1>
    }

    async function handleSubmit(data: NewUser) {
            console.log(data); 
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
return(
        <div style={{width: '550px'}}>
            <Formik 
                initialValues={{email: '',
                                username: '',
                                password: '',
                                confirmPass: ''}}
                onSubmit={handleSubmit}
            >
            {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                    return (
                        <form onSubmit={handleSubmit} onBlur={handleBlur}>
                            
                        <div className='formContainer' style={{borderRadius: '10px 10px 0px 10px'}} >
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
                        <div style={{ width: 'fit-content', display: 'inline-flex', float: 'right' }}>
                            
                            <div>
                                <button type='submit'
                                    name='login'
                                    className='button bottomButtons submitButton scaleYonHover' 
                                    style={{
                                        borderRadius: '5px 0px 5px 5px',
                                        margin: '2px 0px 0px 0px',
                                        justifySelf: 'right'
                                    }}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                        </form>
                        
                    )}
                }
            </Formik>
        </div>
    )
}








