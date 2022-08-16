import { Alert, Snackbar, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationSuite from './Components/Layout/NavigationComponents/NavigationSuite';
import LoginPage from './Components/Layout/Pages/LoginPages/LoginPage';
import SignUpPage from './Components/Layout/Pages/LoginPages/SignUpPage';
import ManageTeamPage from './Components/Layout/Pages/ManageTeamPage/ManageTeamPage';
import ProjectsPage from './Components/Layout/Pages/ProjectsPage/ProjectsPage';
import TicketsPage from './Components/Layout/Pages/TicketsPage/TicketsPage';
import TeamInvitesPage from './Components/Layout/Pages/LoginPages/TeamInvitesPage';
import SelectTeamPage from './Components/Layout/Pages/LoginPages/SelectTeamPage';
import NewTeamPage from './Components/Layout/Pages/LoginPages/NewTeamPage';
import './Sass/styles.css';
import { theme } from './theme';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {LoginActionCreators, SocketActionCreators, WindowSizeActionCreators } from './Redux';
import { io } from 'socket.io-client';
import { State } from './Redux/reducers';
import { Demo } from './Components/Layout/Pages/LoginPages/Demo/Demo';
import SelectDemoTeam from './Components/Layout/Pages/LoginPages/Demo/SelectDemoTeam';

function App() {
  const dispatch = useDispatch();
  const { login } = bindActionCreators(LoginActionCreators, dispatch);
  const { updateSocket } = bindActionCreators(SocketActionCreators, dispatch);
  const { updateSize } = bindActionCreators(WindowSizeActionCreators, dispatch);
  const [isTeamSelected, setIsTeamSelected] = useState(true);
  const loginState = useSelector((state: State) => state.login);
  const sessionState = useSelector((state: State) => state.session);
  const alertState = useSelector((state: State) => state.alert);
  const windowWidth = useSelector((state: State) => state.windowSize);
  let isSessionState = typeof sessionState.currentTeam?.name !== 'undefined';

  //adasd
  const onResize = () => {
    // let oldBreakpoint = getBreakpointName(windowWidth)
    // let newBreakpoint = getBreakpointName(window.innerWidth)

    let difference =  window.innerWidth - windowWidth
    if(difference > 10 || difference < -10){
      return updateSize(window.innerWidth)
    }
    // if(oldBreakpoint !== newBreakpoint){
    //   return updateSize(window.innerWidth)
    // }
  }
  //a window size observer. I refuse to write any media queries for this application
  useEffect(() => {
    window.addEventListener('resize', onResize)
    return ()=>{
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])

  //connect socket.io only if the user is logged in AND theyve selected a team, still need server side security of course
  useEffect(() => {
    if (loginState === 1 && isSessionState === true) {
      const socket = io('bug-tracker-ps.herokuapp.com', { withCredentials: true });
      socket.on('connect', () => {});
      updateSocket(socket);
  
      return () => {
        socket.disconnect()
      }
    }
  }, [login]);

  let isLogged = sessionStorage.getItem('isLoggedIn');
  if (isLogged === 'true') {
    login();
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='signUp' element={<SignUpPage />} />
        <Route path='login' element={<LoginPage />} />

        <Route path='demo' element={<Demo />} />
        <Route path='selectDemoTeam' element={<SelectDemoTeam setIsTeamSelected={setIsTeamSelected}/>} />

        <Route
          path='newTeam' //must be logged in
          element={<NewTeamPage />}
        />
        <Route
          path='selectTeam' //must be logged in
          element={<SelectTeamPage setIsTeamSelected={setIsTeamSelected} />}
        />
        <Route
          path='teamInvites' //must be logged in
          element={<TeamInvitesPage />}
        />

        <Route
          path='/'
          element={
            //must be logged in and and have a selected team
            <NavigationSuite isTeamSelected={isTeamSelected} />
          }
        >

          <Route
            path='tickets' //must be logged in and and have a selected team
            element={<TicketsPage isTeamSelected={isTeamSelected} />}
          />

          <Route
            path='projects' //must be logged in and and have a selected team
            element={<ProjectsPage isTeamSelected={isTeamSelected} />}
          />

          <Route
            path='team' //must be logged in and and have a selected team
            element={<ManageTeamPage isTeamSelected={isTeamSelected} />}
          />
        </Route>
      </Routes>
      <Snackbar
        open={alertState.isOpen}
        autoHideDuration={7000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        style={{marginLeft: 'auto', width: 'fit-content'}}
      >
        <Alert
          severity='error'
          style={{
            border: '1px solid #efff0a',
            backgroundColor: '#1a1a1a',
            color: '#efff0a',
            paddingTop: '10px',
            fill: '#efff0a'
          }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
