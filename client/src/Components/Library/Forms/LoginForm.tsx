import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import postLogin from '../../../API/Requests/PostLogin';
import { auth } from '../../../API/Services/Auth';
import { Claims } from '../../../API/interfaces/claims';

export default function LoginForm() {
return(
        <div style={{width: '700px'}}>
            <Formik 
                initialValues={{email: '',
                                password: ''}}
                onSubmit={(data: Claims) => {
                    console.log(data);
                    auth.signIn(data);
                }}
            >
            {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                    return (
                        <form onSubmit={handleSubmit} onBlur={handleBlur}>
                            
                        <div className='formContainer' >
                            <h4 className='header'>Login</h4>
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
                                name='password' 
                                value={values.password} 
                                label='Password' 
                                className='loginFormComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                required />
                            <div style={{marginTop: '20px'}}>
                                <button className='button'>sign up</button>
                                <button className='button'>demo login</button>
                                <button className='button'>github</button>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                            <button type='submit'
                                name='login'
                                className='button bottomButtons submitButton' 
                                style={{
                                    borderRadius: '5px 0px 5px 5px',
                                    margin: '2px 0px 0px 0px'
                                }}>
                                Sign in
                            </button>
                        </div>
                        </form>
                    )}
                }
            </Formik>
        </div>
    )
}








