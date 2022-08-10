import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Invites } from '../../../Redux/interfaces/invites';
import { AlertActionCreators, InvitesActionCreators } from '../../../Redux';
import getInvites from '../../../API/Requests/Invites/getInvites';
import { CustomResponse } from '../../../API/Requests/Base/baseRequest';
import alertDispatcher from '../../../API/Requests/AlertDispatcher';
import { State } from '../../../Redux/reducers';
import { BreakPoints } from '../Breakpoints';
import { Box, Button, ButtonGroup } from '@mui/material';

export default function SelectTeamPageButtons() {
  const invitesState = useSelector((state: Invites) => state.invites);
  const dispatch = useDispatch();
  const {fireAlert, hideAlert} = bindActionCreators(AlertActionCreators, dispatch)
  const { updateInvites } = bindActionCreators(InvitesActionCreators, dispatch);
  const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth
  let navigate = useNavigate();

  useEffect(() => {
    (async()=>{
      let response: CustomResponse = await getInvites()
      response.isOk
      ? updateInvites(response.body)
      : alertDispatcher(fireAlert, response.error, hideAlert)
    })()
  }, []);

  let inviteAmount = invitesState.length || 0;

  let plurality = isPlural(invitesState.length);
  //get the amount of team invites the user has from invite store
  function isPlural(invites: any) {
    if (invites === '1') {
      let plurality = ' Team Invite';
      return plurality;
    } else {
      let plurality = ' Team Invites';
      return plurality;
    }
  }

  function handleLogout() {
    navigate('/login');
  }
  function handleCreateTeam() {
    navigate('/newTeam');
  }
  function handleCheckInvites() {
    navigate('/teamInvites');
  }
  function handleChooseTeam() {
    navigate('/selectTeam');
  }

  if(windowWidth <= BreakPoints.medium ){
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
          position: 'fixed',
          bottom: '10px',
          zIndex:'4'
        }}
      >
        <ButtonGroup variant="text" aria-label="text button group" color='inherit' sx={{height: '30px', backgroundColor: '#222222'}}>
          <Button onClick={handleLogout} >
            <p style={{fontWeight: '200', fontSize: '10px', whiteSpace: 'nowrap', color: 'white'}}>
              Logout
            </p>
          </Button>
          <Button onClick={handleCreateTeam}>
            <p style={{fontWeight: '200', fontSize: '10px', whiteSpace: 'nowrap', color: 'white '}}>
              Create
            </p>
          </Button>
          <Button onClick={handleChooseTeam}>
            <p style={{fontWeight: '200', fontSize: '10px', whiteSpace: 'nowrap', color: 'white '}}>
              Choose a team
            </p>
          </Button>
          <Button onClick={handleCheckInvites}>
            <span style={{fontWeight: '200', fontSize: '10px', whiteSpace: 'nowrap', color: 'white'}}>{`${plurality}\u00a0`}</span>
            <span className='invitesNum' style={{paddingBottom: '2px'}}>{inviteAmount}</span>
          </Button>
        </ButtonGroup>
      </Box>
    )
  } else {
    return (
      <>
        <button
          className='selectTeamPageNavbutton glowsToo'
          style={{ bottom: '10px', position: 'absolute' }}
          onClick={handleLogout}
        >
          Logout
        </button>
  
        <span
          className='selectTeamPageNavContainer'
          style={{ bottom: '30px', position: 'absolute' }}
        >
          <span>
            <button
              className='selectTeamPageNavbutton glowsToo'
              style={{ paddingRight: '0px' }}
              onClick={handleCreateTeam}
            >
              Create
            </button>
          </span>
          <span className='selectTeamPageNavbuttonExtra'>/</span>
          <span>
            <button
              className='selectTeamPageNavbutton glowsToo'
              style={{ paddingLeft: '0px' }}
              onClick={handleChooseTeam}
            >
              Choose
            </button>
          </span>
          <span className='selectTeamPageNavbuttonExtra glowsToo'>a team</span>
        </span>
  
        <button
          className='selectTeamPageNavbutton'
          style={{ bottom: '50px', position: 'absolute' }}
          onClick={handleCheckInvites}
        >
          <span className='invitesNum'>{inviteAmount}</span>
          <span className='glowsToo'>{plurality}</span>
        </button>
      </>
    );
  }
}
