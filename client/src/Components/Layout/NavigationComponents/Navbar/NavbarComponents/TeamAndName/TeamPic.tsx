import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../../../../Redux/reducers';
import { BreakPoints } from '../../../../../Library/Breakpoints';

export default function Team() {
  const sessionState = useSelector((state: State) => state.session);
  const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth

  let TeamName = sessionState.currentTeam?.name;
  return (
    <>
      <h3
        className='delayedFadeIn'
        style={{
          color: 'white',
          whiteSpace: 'nowrap',
          textAlign: `${windowWidth <= BreakPoints.mobile ? 'center' : 'left'}`,
          marginLeft: '10px',
          fontWeight: 'lighter',
          cursor: 'default',
          width: 'calc(100% - 60px)'
        }}
      >
        {TeamName}
      </h3>
    </>
  );
}
