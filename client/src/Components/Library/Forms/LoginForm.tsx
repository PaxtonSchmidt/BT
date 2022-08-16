import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import { authService } from '../../../Services/AuthService';
import { Claims } from '../../../API/interfaces/claims';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertActionCreators, LoginActionCreators } from '../../../Redux';
import postInvalidateJWT from '../../../API/Requests/Login/PostInvalidateJWT';
import alertDispatcher from '../../../API/Requests/AlertDispatcher';
import { useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';
import { BreakPoints } from '../Breakpoints';
import bug from '../../Images/Icons/bug.svg'
import { LoginFormButtons } from './LoginFormButtons';

export default function LoginForm() {
    const dispatch = useDispatch();
    const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators,dispatch);
    const { login } = bindActionCreators(LoginActionCreators, dispatch);
    const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth

    let navigate = useNavigate();

    async function handleSubmit(data: Claims) {
        let attemptResult = await authService.signIn(data);
        if(attemptResult.isOk){
            login(); //update login redux state
            navigate('/selectTeam');
        } else {
            alertDispatcher(fireAlert, attemptResult.error, hideAlert)
        }
    }
    
    return (
        <>
        <div style={{marginTop: '10vh', paddingTop: '40px'}} className={`${windowWidth < BreakPoints.tablet ? 'loginFormContainer' : 'loginFormContainerLG'}`}>
            <img src={bug} style={{marginLeft: '5px'}}/>
            <h4 className='header'>BugTracker</h4>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}>
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }) => {
                    return (
                        <form
                        onSubmit={handleSubmit}
                        onBlur={handleBlur}>
                                <div className='loginForm'>
                                <TextField
                                    label='Email'
                                    type='text'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='email'
                                    variant='standard'
                                    className='loginField'
                                    color='info'
                                    fullWidth={true}
                                    required
                                />
                        
                                <TextField
                                    name='password'
                                    type='password'
                                    value={values.password}
                                    label='Password'
                                    color='info'
                                    variant='standard'
                                    className='loginField'
                                    onChange={handleChange}
                                    fullWidth={true}
                                    onBlur={handleBlur}
                                    required
                                />
                                <p
                                    className='scaleYonHover'
                                    style={{
                                        marginTop: '10px',
                                        marginBottom: '5px',
                                        textAlign: 'right',
                                        cursor: 'pointer',
                                        opacity: '70%',
                                        fontSize: '12px',
                                        color: '#ffffff31'
                                    }}
                                    onClick={()=>postInvalidateJWT()}
                                    >
                                    Forgot Password?
                                </p>
                            <div style={{whiteSpace: 'nowrap'}}>
                            </div>
                            <div
                                style={{
                                    width: 'fit-content',
                                    display: 'inline-flex',
                                    float: 'right',
                                    marginTop: 'auto'
                                }}>
                                <div>
                                    <button
                                        type='submit'
                                        name='login'
                                        className={`button scaleYonHover button-border button-tb hoverGreen`}
                                        style={{
                                            margin: '2px 0px 0px 0px',
                                            justifySelf: 'right',
                                            backgroundColor: '#ffffff31'
                                        }}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                            <div style={windowWidth < BreakPoints.tablet ? {float: 'left'} : {display: 'none'}}>
                                <LoginFormButtons />
                            </div>
                            </div>
                            
                        </form>
                        
                    );
                }}
            </Formik>
                <div style={{
                    justifyContent: 'space-between',
                    marginTop: '200px',
                    width: '100%',
                    display: `${windowWidth >= BreakPoints.tablet ? '' : 'none'}`
                    }}
                    >
                    <LoginFormButtons />
                </div>
            </div>
        </>
    );
}
