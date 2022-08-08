import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import alertDispatcher from '../../../API/Requests/AlertDispatcher';
import { CustomResponse } from '../../../API/Requests/Base/baseRequest';
import getSessionState from '../../../API/Requests/Login/getSessionState';
import getUsersOnTeam from '../../../API/Requests/Teams/GetUsersOnTeam';
import getTickets from '../../../API/Requests/Tickets/GetTickets';
import {AlertActionCreators,SessionActionCreators,TeammatesActionCreators,TicketsActionCreators} from '../../../Redux';
import { State } from '../../../Redux/reducers';
import { BreakPoints } from '../../Library/Breakpoints';
import Hamburger from './Hamburger';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import SidebarModal from './Sidebar/SidebarModal';

interface Props {
  isTeamSelected: boolean;
}

export default function NavigationSuite({ isTeamSelected }: Props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { updateSession } = bindActionCreators(SessionActionCreators, dispatch);
  const { updateTeammates } = bindActionCreators(TeammatesActionCreators, dispatch);
  const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators, dispatch);
  const { updateTickets } = bindActionCreators(TicketsActionCreators, dispatch);
  const loginState = useSelector((state: State) => state.login);
  const sessionState = useSelector((state: State) => state.session);
  const socketState = useSelector((state: State) => state.socket);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth //just so it has the inner width for the first render before it loads the redux state

  const [isNormalSidebar, setIsNormalSidebar] = useState(true)
  useEffect(()=>{
    if(windowWidth < BreakPoints.tablet){
      setIsNormalSidebar(false)
    } else {
      setIsNormalSidebar(true)
    }
}, [windowWidth])

  async function getSession() {
    let response: CustomResponse = await getSessionState()
    return response.isOk 
    ? updateSession(await response.body)
    : alertDispatcher(fireAlert, response.error, hideAlert)
  }
  async function getTeammates() {
    let response: CustomResponse = await getUsersOnTeam()
    return response.isOk 
    ? updateTeammates(await response.body)
    : alertDispatcher(fireAlert, response.error, hideAlert)
  }
  async function getTeamTickets(){
    let response: CustomResponse = await getTickets()
    response.isOk
    ? updateTickets(await response.body)
    : alertDispatcher(fireAlert, response.error, hideAlert)
  }

  useEffect(() => {
    (async ()=>{
      if (loginState === 1) {
        getSession();
        getTeammates();
        getTeamTickets()
      }
    })()
  }, []);

  useEffect(() => {
    if(location.pathname === '/projects' 
      && (sessionState.currentTeam !== undefined) 
      && socketState)
      {
      sessionState.currentTeam.projects.forEach((project: any)=>{
        socketState.emit(
          'joinProject',
          project.project_id
        );
      })
    }
  }, [location.pathname])

  let role = 3; //defaults to dev perms, sets to actual role when the sessionState arrives
  role = sessionState.currentTeam?.team_role;

  if (loginState === 1) {
    if (isTeamSelected === true) {
      return (
        <>
          <Navbar />
          <Hamburger
            setIsSideBarExpanded={setIsExpanded}
            isSideBarExpanded={isExpanded}
          />

          {isNormalSidebar
          ? <Sidebar teamRole={role} isExpanded={isExpanded} />
          : <SidebarModal teamRole={role} isExpanded={isExpanded} setIsExpanded={setIsExpanded
          
          } />
          }
          
          <Outlet />
        </>
      );
    }
    return <Navigate to='/selectTeam' />;
  }
  return <Navigate to='/login' />;
}


