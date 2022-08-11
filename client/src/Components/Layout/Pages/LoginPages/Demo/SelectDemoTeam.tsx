import react, { Dispatch, useState } from 'react';
import { useEffect } from 'react';
import { SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import getTeamsFromDB from '../../../../../API/Requests/Teams/GetTeamFromDB';
import {AlertActionCreators, TeamsActionCreators } from '../../../../../Redux'
import { State } from '../../../../../Redux/reducers';
import alertDispatcher from '../../../../../API/Requests/AlertDispatcher'
import TeamList from '../../../../Library/Teams/TeamList';
import { Button, ButtonGroup } from '@mui/material';

interface Props {
  setIsTeamSelected: Dispatch<SetStateAction<boolean>>;
}

export default function SelectDemoTeam({ setIsTeamSelected }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateTeams } = bindActionCreators(TeamsActionCreators, dispatch);
  const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators, dispatch);
  const loginState = useSelector((state: State) => state.login);

  async function getTeams() {
    let response = await getTeamsFromDB()
    if(response.isOk){
      return updateTeams(response.body);
    } else if(response.error.status === 400){
      return window.location.assign('/demo');
    } else {
      return alertDispatcher(fireAlert, response.error, hideAlert)
    }
  }

  useEffect(() => {
    getTeams();
  }, []);

  if (loginState === 1) {
    return (
      <div className='teamCardPageBody altBG' style={{overflowX: 'hidden'}}>
        <div id='cards'>
          <TeamList setIsTeamSelected={setIsTeamSelected} isDemo={true} />
        </div>  
        <div style={{position: 'absolute', bottom: '30px'}}>
          <button className='button hoverGrey scaleYonHover' onClick={()=>{navigate('/login')}} style={{height: '30px', width: 'fit-content', borderRadius:'5px'}} >
            Login
          </button>
          <button className='button hoverGrey scaleYonHover' onClick={()=>{navigate('/signUp')}} style={{height: '30px', width: 'fit-content', borderRadius:'5px'}} >
            Sign up
          </button>
          <button className='button hoverGrey scaleYonHover' onClick={()=>{navigate('/demo')}} style={{height: '30px', width: 'fit-content', borderRadius:'5px'}} >
              Select demo account
          </button>
        </div>
      </div>
    );
  }
  return <Navigate to='/demo' />;
}
