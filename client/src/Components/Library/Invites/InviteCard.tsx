import React, { Dispatch, SetStateAction } from 'react';
import { Invite } from '../../ComponentInterfaces/invite';
import deleteInvite from '../../../API/Requests/Invites/DeleteInvite';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { AlertActionCreators, InvitesActionCreators } from '../../../Redux';
import { AnyMessageParams } from 'yup/lib/types';
import postAcceptInvite from '../../../API/Requests/Invites/PostAcceptInvite';
import alertDispatcher from '../../../API/Requests/AlertDispatcher';
import { fireAlert, hideAlert } from '../../../Redux/action-creators/alertActionCreator';

export default function InviteCard(props: Invite) {
  const dispatch = useDispatch();
  const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators,dispatch);
  const { remove } = bindActionCreators(InvitesActionCreators, dispatch);

  async function handleAcceptInvite(invite_id: any, team_name: any) {
    let response = await postAcceptInvite(invite_id);
    response.isOk
    ? remove(invite_id)
    : alertDispatcher(fireAlert, response.error, hideAlert)
  }
  async function handleDeleteInvite(invite_id: any) {
    let response = await deleteInvite(invite_id);
    response.isOk
    ? remove(invite_id)
    : alertDispatcher(fireAlert, response.error, hideAlert)
  } 

  return (
    <div
      className='card fadeIn scaleYonHover hoverGrey'
      style={{ cursor: 'default' }}
    >
      <div
        className='cardContent'
        style={{ color: 'white', fontWeight: 'bold' }}
      >
        <div className='cardTeamName'>{props.team_name}</div>
        <div className='cardTeamOwner'>
          <span className='cardTeamOwnerName'>
            <span className='username'>{props.sender_name}</span>
            <span className='discriminator' style={{ opacity: '100%' }}>
              #{props.sender_discriminator}
            </span>
          </span>
        </div>
        <button
          className='cardButton decline'
          onClick={() => handleDeleteInvite(props.invite_id)}
        >
          Decline
        </button>
        <button
          className='cardButton'
          style={{ backgroundColor: 'green' }}
          onClick={() => handleAcceptInvite(props.invite_id, props.team_name)}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
