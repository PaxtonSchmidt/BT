import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import postInviteToTeam from '../../../API/Requests/Invites/PostInviteToTeam';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertActionCreators } from '../../../Redux';
import alertDispatcher from '../../../API/Requests/AlertDispatcher';

interface Props {
  isExtended: boolean;
  setIsExtended: Dispatch<SetStateAction<boolean>>;
}

export default function InviteToTeamForm(props: Props) {
  const dispatch = useDispatch();
  const { fireAlert, hideAlert } = bindActionCreators(
    AlertActionCreators,
    dispatch
  );
  
  return (
    <>
    <div className={`loginFormContainer ${props.isExtended ? 'FormTransition' : ''}`}  style={{paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px', borderRadius: '0px', boxShadow: 'none', transition: '.5s'}}>
      <Formik
        initialValues={{ invitee: '', discriminator: '' }}
        onSubmit={async (data, { resetForm }) => {
          let response = await postInviteToTeam(data);
          if(response.isOk){
            props.setIsExtended(false) 
            resetForm()
          } else {
            alertDispatcher(fireAlert, response.error, hideAlert)
          }
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          resetForm,
        }) => {
          //need to grab the team name somehow
          return (
            <form
              style={{ width: 'fit-content', padding: '10px' }}
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              onBlur={handleBlur}
              className='fadeIn'
            >
                <h4 className='header'>Invite people</h4>
                <TextField
                  label='Username'
                  type='text'
                  value={values.invitee}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='invitee'
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
                  onClick={() => {
                    resetForm();
                    props.setIsExtended(false);
                  }}
                  className='button scaleYonHover cancelButton'
                  style={{ margin: '2px 2px 0px 0px', borderRadius: '5px' }}
                >
                  X
                </button>
                <button
                  type='submit'
                  name='addToTeam'
                  className='button scaleYonHover hoverGrey'
                  style={{
                    margin: '2px 0px 0px 0px', borderRadius: '5px',
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
    </>
  );
}
