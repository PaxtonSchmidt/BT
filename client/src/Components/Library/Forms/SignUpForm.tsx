import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import { authService } from '../../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import { NewUser } from '../../../API/interfaces/NewUser';
import { bindActionCreators } from 'redux';
import { AlertActionCreators } from '../../../Redux';
import { useDispatch, useSelector } from 'react-redux';
import alertDispatcher from '../../../API/Requests/AlertDispatcher';
import { State } from '../../../Redux/reducers';
import { BreakPoints } from '../Breakpoints';

export default function SignUpForm() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators,dispatch);
  const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth

  async function handleSubmit(data: NewUser) {
    if (data.password !== data.confirmPass) {
      fireAlert({
        isOpen: true,
        status: 0,
        message: 'Passwords dont match...',
      });
      return setTimeout(hideAlert, 6000);
    } else if (data.discriminator > 9999 || data.discriminator < 1) {
      fireAlert({
        isOpen: true,
        status: 0,
        message: 'Please use a number between 1 and 9999',
      });
      return setTimeout(hideAlert, 6000);
    }
    let attemptResult = await authService.signUp(data);
    if(attemptResult.isOk){
      return navigate('/login');
    }else {
      alertDispatcher(fireAlert, attemptResult.error, hideAlert)
    }
  }

  function handleGoBack() {
    navigate('/login');
  }
  return (
    <>
    <div style={{marginTop: '10vh'}} className={`${windowWidth < BreakPoints.mobile ? 'loginFormContainer' : 'loginFormContainerLG'}`}>
      <h4 className='header'>Sign Up</h4>
        <Formik
          initialValues={{
            email: '',
            username: '',
            discriminator: 0,
            password: '',
            confirmPass: '',
            bio: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, handleSubmit, handleReset }) => {
            return (
              <form
                
                onSubmit={handleSubmit}
                onBlur={handleBlur}
              >
                <div className='loginForm' style={{alignContent: 'bottom', flexGrow: '1'}}>
                  <div>
                  <TextField
                    label='Email'
                    type='text'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='email'
                    variant='standard'
                    color='info'
                    required
                    fullWidth
                  />
                  <TextField
                    label='Username'
                    type='text'
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='username'
                    variant='standard'
                    color='info'
                    required
                    fullWidth
                  />
                  <TextField
                    label='#0000'
                    type='number'
                    value={values.discriminator}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='discriminator'
                    variant='standard'
                    color='info'
                    required
                    fullWidth
                  />
                  <TextField
                    name='bio'
                    value={values.bio}
                    label='Bio'
                    color='info'
                    variant='standard'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  <TextField
                    type='password'
                    name='password'
                    value={values.password}
                    label='Password'
                    color='info'
                    variant='standard'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    fullWidth
                  />
                  <TextField
                    type='password'
                    name='confirmPass'
                    value={values.confirmPass}
                    label='Confirm Password'
                    color='info'
                    variant='standard'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    fullWidth
                  />
                  </div>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop:'10px'
                    }}
                  >
                    <button
                      type='reset'
                      onClick={handleGoBack}
                      className='button scaleYonHover hoverGrey button-border '
                      style={{ margin: '2px 2px 0px 0px', width: '120px' }}
                    >
                      Back to Login
                    </button>
                    <button
                      type='submit'
                      name='login'
                      className='button scaleYonHover hoverGrey button-border button-tb'
                      style={{
                        margin: '2px 0px 0px 0px',
                        justifySelf: 'right',
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
