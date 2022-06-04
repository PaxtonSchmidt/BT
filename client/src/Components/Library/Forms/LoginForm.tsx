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
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginActionCreators } from '../../../Redux';


export default function LoginForm() {
    const dispatch = useDispatch();
    const { login } = bindActionCreators(LoginActionCreators, dispatch)

    let navigate = useNavigate();

    function handleSignUpClick() {
        navigate('../SignUp');
    }
    function handleDemoClick() {
        navigate('../DemoApp');
    }
    function handleGitHubClick() {
        window.location.href= 'https://github.com/PaxtonSchmidt/BT';
    }

    async function handleSubmit(data: Claims) {
            let attemptResult = await authService.signIn(data);
            if(attemptResult === 200){
                login()
                navigate('/selectTeam')
                window.location.reload();
            }
    }
    return(
        <div className='loginForm' style={{width: '550px'}}>
            <Formik 
                initialValues={{email: '',
                                password: ''}}
                onSubmit={handleSubmit}
            >
            {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                    return (
                        <form onSubmit={handleSubmit} onBlur={handleBlur}>
                            
                        <div className='formContainer'>
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
                                // type='password'
                                value={values.password} 
                                label='Password' 
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
                                    className='button bottomButtons submitButton' 
                                    style={{
                                        margin: '2px 0px 0px 0px',
                                        justifySelf: 'right'
                                    }}>
                                    Submit
                                </button>
                            </div>
                        </div>
                        </form>
                        
                    )}
                }
            </Formik>
            <div style={{float: 'left'}}>
                <button 
                    onClick={handleSignUpClick}
                    className='button bottomButtons' 
                    style={{margin: '2px 2px 0px 0px'}}>
                    Sign Up
                </button>
                <button 
                    onClick={handleDemoClick}
                    className='button bottomButtons' 
                    style={{margin: '2px 2px 0px 0px'}}>
                    Demo
                </button>
                <button 
                    onClick={handleGitHubClick}
                    className='button bottomButtons' 
                    style={{margin: '2px 2px 0px 0px'}}>
                    <img src={gitHub} alt='go to code'/>
                </button>
            </div>
        </div>
    )
}








