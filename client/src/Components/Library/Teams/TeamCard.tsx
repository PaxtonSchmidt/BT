import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { State } from '../../../Redux/reducers';
import { authService } from '../../../Services/AuthService';
import { Team } from '../../ComponentInterfaces/team';

export default function TeamCard(props: Team) {
  return (
    <div className='card fadeIn scaleYonHover hoverGrey'>
      <div
        className='cardContent'
        style={{ color: 'white', fontWeight: 'bold' }}
      >
        <div
          style={{ whiteSpace: 'nowrap', marginLeft: '10px' }}
        >
          {props.name}
        </div>
        <div className='cardTeamOwner'>
          <span className='cardTeamOwnerName'>
            <span className='username'>{props.ownerName}</span>
            <span className='discriminator' style={{ opacity: '100%' }}>
              #{props.ownerDiscriminator}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
