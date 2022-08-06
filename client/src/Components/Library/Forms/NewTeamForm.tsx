import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import postNewTeam from '../../../API/Requests/Teams/PostNewTeam';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertActionCreators } from '../../../Redux';
import alertDispatcher from '../../../API/Requests/AlertDispatcher';

export default function NewTeamForm() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators,dispatch);

  async function handleSubmit(data: any) {
    let attemptResult = await postNewTeam(data);
    attemptResult.isOk
    ? navigate('/selectTeam')
    : alertDispatcher(fireAlert, attemptResult.error, hideAlert)
  }

  return (
    <div className='loginFormContainer fadeIn'>
      <h4 className='header'>Create Team</h4>
      <Formik initialValues={{ name: '' }} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur, handleSubmit, handleReset }) => {
          return (
            <form onSubmit={handleSubmit} onBlur={handleBlur}>
              <div className='formContainer' style={{ minWidth: '300px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <TextField
                    label='Team Name'
                    type='text'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='formComponent'
                    style={{ width: '100%' }}
                    name='name'
                    variant='standard'
                    color='info'
                    required
                  />
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <button
                  type='submit'
                  name='submit'
                  className='button bottomButton bottomButtons submitButton'
                  style={{
                    margin: '2px 0px 0px 0px',
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
