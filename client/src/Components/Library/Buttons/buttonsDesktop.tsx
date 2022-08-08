import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { authService } from '../../../Services/AuthService';
import { Invites } from '../../../Redux/interfaces/invites';
import { AlertActionCreators, InvitesActionCreators, LoginActionCreators } from '../../../Redux';
import getInvites from '../../../API/Requests/Invites/getInvites';
import { CustomResponse } from '../../../API/Requests/Base/baseRequest';
import alertDispatcher from '../../../API/Requests/AlertDispatcher';
import { fireAlert, hideAlert } from '../../../Redux/action-creators/alertActionCreator';

export default function SelectTeamPageButtons() {
  const invitesState = useSelector((state: Invites) => state.invites);
  const dispatch = useDispatch();
  const {fireAlert, hideAlert} = bindActionCreators(AlertActionCreators, dispatch)
  const { updateInvites } = bindActionCreators(InvitesActionCreators, dispatch);
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
