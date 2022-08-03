import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import TeammateList from '../../../Library/Teams/TeamMemberList';
import InviteToTeamFormContainer from './inviteToTeamFormContainer';
import TeamDetails from './TeamDetails';
import TeammateDetails from './TeammateDetails';

interface Props {
  isTeamSelected: boolean;
}

export default function ManageTeamPage({ isTeamSelected }: Props) {
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const loginState = useSelector((state: State) => state.login);
  const sessionState = useSelector((state: State) => state.session);

  if (sessionState.currentTeam === undefined) {
    return <></>;
  }
  //if you are not logged, go to login, if team is not selected, go to team select, if you are not the team owner, go to tickets
  if (loginState === 1) {
    if (isTeamSelected === true) {
      if (
        sessionState.currentTeam.team_role === 1 ||
        sessionState.currentTeam.team_role === 2
      ) {
        return (
          <div className='overflow'>
            <div
              id='pageContentContainer'
              className={`pageContentContainer manageTeamPageContent ${
                isExtended ? 'FormContainerTransition' : ''
              }`}
            >
              <InviteToTeamFormContainer
                isExtended={isExtended}
                setIsExtended={setIsExtended}
              />
            </div>
            <div className='pageBodyContainer4'>
              <div
                className='pageBodyContaine4'
                style={{
                  color: 'white',
                  borderBottom: '1px solid #ffffff31',
                  paddingBottom: '10px',
                }}
              >
                <TeamDetails />
              </div>
              <div className='pageBodyContainer5' style={{ color: 'white' }}>
                <div
                  className='pageBodyQuadrant'
                  style={{ flexDirection: 'column', paddingRight: '10px' }}
                >
                  <TeammateList />
                </div>
                <div
                  className='pageBodyQuadrant fadeIn'
                  style={{
                    borderRight: 'none',
                    flexDirection: 'column',
                    paddingLeft: '10px',
                  }}
                >
                  <TeammateDetails />
                </div>
              </div>
            </div>
          </div>
        );
      }
      return <Navigate to='/tickets' />;
    }
    return <Navigate to='/selectTeam' />;
  }
  return <Navigate to='/login' />;
}
