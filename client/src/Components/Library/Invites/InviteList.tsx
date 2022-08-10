import React, { Dispatch, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Invite } from '../../ComponentInterfaces/invite';
import { AlertActionCreators, InvitesActionCreators } from '../../../Redux';
import { Invites } from '../../../Redux/interfaces/invites';
import InviteCard from './InviteCard';
import alertDispatcher from '../../../API/Requests/AlertDispatcher';
import getInvites from '../../../API/Requests/Invites/getInvites';

function InviteList() {
  const dispatch = useDispatch();
  const initial: any = [];
  const invitesState = useSelector((state: Invites) => state.invites);
  let invites = Object.assign(initial, invitesState);

if (invites.length < 1) {
    return (
      <>
         <h1 className={`delayedFadeIn`} style={{ color: 'white', height: '50px' }}>
          Looks like you don't have any invites...
        </h1>
      </>
    );
  } else {
    return (
      <>
        <h1
          className='fadeIn'
          style={{
            color: 'white',
            textAlign: 'left',
            fontWeight: 'bold',
            paddingLeft: '10px',
          }}
        >
          Your Invites
        </h1>
        {invites.map((invite: Invite) => (
          <div key={invite.invite_id}>
            <InviteCard
              invite_id={invite.invite_id}
              team_name={invite.team_name}
              sender_name={invite.sender_name}
              sender_discriminator={invite.sender_discriminator}
              date_sent={invite.date_sent.slice(0, 10)}
            />
          </div>
        ))}
      </>
    );
  }
}

export default InviteList;
