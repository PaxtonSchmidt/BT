import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { FocusedTeammateActionCreators } from '../../../../Redux';
import { State } from '../../../../Redux/reducers';
import { BreakPoints } from '../../../Library/Breakpoints';
import TeammateList from '../../../Library/Teams/TeamMemberList';
import InviteToTeamFormContainer from './inviteToTeamFormContainer';
import TeamDetails from './TeamDetails';
import TeammateDetails from './TeammateDetails';
import { TeammateDetailsModal } from './TeammateDetailsModal';

interface Props {
  isTeamSelected: boolean;
}

export default function ManageTeamPage({ isTeamSelected }: Props) {
  const dispatch = useDispatch();
  const { resetFocusedTeammate } = bindActionCreators(FocusedTeammateActionCreators, dispatch);
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const loginState = useSelector((state: State) => state.login);
  const sessionState = useSelector((state: State) => state.session);
  const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth
  const focusedTeammate = useSelector((state: State) => state.focusedTeammate);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)

  useEffect(() =>{
    if(focusedTeammate.username !== undefined){
      setIsDetailsModalOpen(true)
    } else {
      setIsDetailsModalOpen(false)
    }
  }, [focusedTeammate])

  if (sessionState.currentTeam === undefined) {
    return <></>;
  }
  //if you are not logged, go to login, if team is not selected, go to team select, if you are not the team owner, go to tickets
  if (loginState === 1) {
    if (isTeamSelected === true) {
      if (
        sessionState.currentTeam.team_role === 1 
        || sessionState.currentTeam.team_role === 2
      ) {
        return (
          <div className='overflow' style={{paddingLeft: `${windowWidth <= BreakPoints.tablet ? '5px' : ''}`}}>
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
                  paddingBottom: '5px',
                }}
              >
                <TeamDetails />
              </div>
              <div className={`pageBodyContainer5 ${windowWidth <= BreakPoints.mobile ? 'pageBodyContainer5SM' : ''}`} style={{ color: 'white' }}>
                <div
                  className='pageBodyQuadrant'
                  style={{ flexDirection: 'column'}}
                >
                  <TeammateList />
                </div>

                {windowWidth > BreakPoints.mobile 
                ?<div
                    className='pageBodyQuadrant fadeIn'
                    style={{
                      borderRight: 'none',
                      flexDirection: 'column'
                    }}
                  >
                    <TeammateDetails />
                  </div>
                :<TeammateDetailsModal resetFocusedTeammate={resetFocusedTeammate} isOpen={isDetailsModalOpen} setIsOpen={setIsDetailsModalOpen} />
                }
                

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
