import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import postLogin from '../../../API/Requests/Login/PostLogin';
import { authService } from '../../../Services/AuthService';
import { Claims } from '../../../API/interfaces/claims';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import gitHub from '../../Images/Icons/github.svg';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertActionCreators, LoginActionCreators } from '../../../Redux';
import postInvalidateJWT from '../../../API/Requests/Login/PostInvalidateJWT';

export default function LoginForm() {
    const dispatch = useDispatch();
    const { fireAlert, hideAlert } = bindActionCreators(
        AlertActionCreators,
        dispatch
    );
    const { login } = bindActionCreators(LoginActionCreators, dispatch);

    let navigate = useNavigate();

    function handleSignUpClick() {
        navigate('../SignUp');
    }
    function handleDemoClick() {
        navigate('../DemoApp');
    }
    function handleGitHubClick() {
        window.location.href = 'https://github.com/PaxtonSchmidt/BT';
    }

    async function handleSubmit(data: Claims) {
        let attemptResult = await authService.signIn(data);
        if (attemptResult.status === 200) {
            login();
            navigate('/selectTeam');
        } else {
            fireAlert({
                isOpen: true,
                status: attemptResult.status,
                message: attemptResult.body,
            });
            setTimeout(hideAlert, 6000);
        }
    }
    return (
        <>
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
                            className='loginFormContainer'
                            onSubmit={handleSubmit}
                            onBlur={handleBlur}>
                            <div
                                className='formContainer'
                                style={{ paddingBottom: '10px' }}>
                                <h4 className='header'>Bug Tracker</h4>
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
                                    required
                                />
                                <TextField
                                    name='password'
                                    // type='password'
                                    value={values.password}
                                    label='Password'
                                    className='formComponent'
                                    color='info'
                                    variant='standard'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                <p
                                    className='scaleYonHover'
                                    style={{
                                        marginTop: '5px',
                                        marginBottom: '0px',
                                        textAlign: 'right',
                                        cursor: 'pointer',
                                        opacity: '70%',
                                        fontSize: '12px',
                                    }}
                                    onClick={()=>postInvalidateJWT()}
                                    >
                                    Forgot Password?
                                </p>
                            </div>
                            <div
                                style={{
                                    width: 'fit-content',
                                    display: 'inline-flex',
                                    float: 'right',
                                }}>
                                <div>
                                    <button
                                        type='submit'
                                        name='login'
                                        className='button bottomButton bottomButtons submitButton'
                                        style={{
                                            margin: '2px 0px 0px 0px',
                                            justifySelf: 'right',
                                        }}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                            <div style={{ float: 'left' }}>
                                <button
                                    onClick={handleSignUpClick}
                                    className='button bottomButton bottomButtons'
                                    style={{ margin: '2px 2px 0px 0px' }}>
                                    Sign Up
                                </button>
                                <button
                                    onClick={handleDemoClick}
                                    className='button bottomButton bottomButtons'
                                    style={{ margin: '2px 2px 0px 0px' }}>
                                    Demo
                                </button>
                                <button
                                    onClick={handleGitHubClick}
                                    className='button bottomButton bottomButtons'
                                    style={{ margin: '2px 2px 0px 0px' }}>
                                    <img src={gitHub} alt='go to code' />
                                </button>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
}
