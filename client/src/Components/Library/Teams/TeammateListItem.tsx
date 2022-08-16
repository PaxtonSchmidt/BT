import React, { useEffect } from 'react';
import { Teammate } from '../../../API/interfaces/teammate';
import { translateRole } from '../../../Services/translateRole';

interface Props {
  teammate: Teammate;
  handleTeammateSelect: any;
  IDX: number;
  focusedTeammateUsername: string;
  focusedTeammateDiscriminator: number;
}

export default function TeammateListItem(props: Props) {
  let role = translateRole.TranslateRole(props.teammate.team_role);
  let chosenTeammateClass: string = '';

  function handleSelect() {
    props.handleTeammateSelect(props.IDX);
  }

  if (
    props.focusedTeammateUsername === props.teammate.username &&
    props.focusedTeammateDiscriminator === props.teammate.discriminator
  ) {
    chosenTeammateClass = 'ChosenTicket';
  }

  return (
    <div
      onClick={() => handleSelect()}
      className={`listItem listRow memberRow ${chosenTeammateClass} scaleYonHover hoverGrey`}
      style={{ justifyContent: 'space-between', marginLeft: '0px', width: '100%' }}
    >
      <div
        className='memberListRowSection'
        style={{ textAlign: 'left', overflow: 'hidden' }}
      >
        <span
          className='rowItem username'
          style={{ display: 'inline-block', marginLeft: '5px' }}
        >
          {props.teammate.username}
        </span>
        <span
          className='rowItem discriminator'
          style={{ display: 'inline-block' }}
        >
          #{props.teammate.discriminator}
        </span>
      </div>
      <div
        className='memberListRowSection'
        style={{ textAlign: 'center', width: '80px' }}
      >
        <span className='rowItem' style={{ textOverflow: 'ellipsis' }}>
          {role}
        </span>
      </div>
    </div>
  );
}
