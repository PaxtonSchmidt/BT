import react, { Dispatch, useState } from 'react';
import { useEffect } from 'react';
import { SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { authService } from '../../../../Services/AuthService';
import {
  AlertActionCreators,
  FocusedTicketActionCreators,
  SessionActionCreators,
  TeamsActionCreators,
  TicketsActionCreators,
} from '../../../../Redux';
import { Session } from '../../../../Redux/interfaces/session';
import { State } from '../../../../Redux/reducers';
import SelectTeamPageButtons from '../../../Library/Buttons/buttonsDesktop';
import TeamList from '../../../Library/Teams/TeamList';
import e, { response } from 'express';
import getTeamsFromDB from '../../../../API/Requests/Teams/GetTeamFromDB';
import alertDispatcher from '../../../../API/Requests/AlertDispatcher';

interface Props {
  setIsTeamSelected: Dispatch<SetStateAction<boolean>>;
}

export default function SelectTeamPage({ setIsTeamSelected }: Props) {
  const dispatch = useDispatch();
  const { updateTeams } = bindActionCreators(TeamsActionCreators, dispatch);
  const { updateSession } = bindActionCreators(SessionActionCreators, dispatch);
  const { updateTickets } = bindActionCreators(TicketsActionCreators, dispatch);
  const { updateFocusedTicket } = bindActionCreators(
    FocusedTicketActionCreators,
    dispatch
  );
  const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators, dispatch);
  const loginState = useSelector((state: State) => state.login);
  let [isBusy, setBusy] = useState(true);
  let nullSession: any = {};
  let nullTicket: any = {};

  async function getTeams() {
    let response = await getTeamsFromDB()
    if(response.isOk){
      return updateTeams(response.body);
    } else if(response.error.status === 400){
      return window.location.assign('/login');
    } else {
      return alertDispatcher(fireAlert, response.error, hideAlert)
    }
  }

  useEffect(() => {
    getTeams();
    setBusy(false);
    updateTickets([]);
    updateSession(nullSession);
    updateFocusedTicket(nullTicket);
  }, []);

  if (loginState === 1) {
    return (
      <div className='teamCardPageBody altBG' style={{overflowX: 'hidden'}}>
        <SelectTeamPageButtons />
        <div id='cards'>
          <TeamList setIsTeamSelected={setIsTeamSelected} />
        </div>
      </div>
    );
  }
  return <Navigate to='/login' />;
}
