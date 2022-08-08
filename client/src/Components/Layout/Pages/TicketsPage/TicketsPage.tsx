import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import { BreakPoints } from '../../../Library/Breakpoints';
import TicketForm from '../../../Library/Forms/TicketForm';
import TicketList from '../../../Library/Tickets/TicketList';
import CommentsAndDetails from './CommentsAndDetails';
import FormAndDetails from './CommentsAndDetails';
import TicketFormContainer from './TicketFormContainer';

interface Props {
  isTeamSelected: boolean;
}

export default function TicketsPage({ isTeamSelected }: Props) {
  const loginState = useSelector((state: State) => state.login);
  const [isExtended, setIsExtended] = useState(false);

  let isFormContainerTransition: string = isExtended === true ? 'FormContainerTransition' : '';
  if (loginState === 1) {
    if (isTeamSelected === true) {
      return (
        <div className='overflow'>
          <div
            id='pageContentContainer'
            className={`pageContentContainer ticketPageContentContainer ${isFormContainerTransition}`}
          >
            <TicketFormContainer
              isExtended={isExtended}
              setIsExtended={setIsExtended}
            />
            <CommentsAndDetails />
          </div>
          <TicketList />
        </div>
      );
    }
    return <Navigate to='/selectTeam' />;
  }
  return <Navigate to='/login' />;
}
