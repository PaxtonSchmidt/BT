import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import LoginForm from '../../../Library/Forms/LoginForm';

interface Props {
  isTeamSelected: boolean;
}

export default function DashboardPage({ isTeamSelected }: Props) {
  const loginState = useSelector((state: State) => state.login);

  if (loginState === 1) {
    if (isTeamSelected === true) {
      return (
        <div
          className='pageContentContainer fadeIn'
          style={{ color: 'white', marginTop: '440px' }}
        >
          maybe show the statistics for their projects on the DashboardPage and
          show their personal stats too? maybe how many assigned tickets they
          have for the team This page will look pretty empty
        </div>
      );
    }
    return <Navigate to='/selectTeam' />;
  }
  return <Navigate to='/login' />;
}
