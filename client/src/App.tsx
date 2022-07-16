import { ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationSuite from './Components/Layout/NavigationComponents/NavigationSuite';
import DashboardPage from './Components/Layout/Pages/DashboardPage/DashboardPage';
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
import { LoginActionCreators } from './Redux';
import { io } from 'socket.io-client';
import { State } from './Redux/reducers';

function App() {
  const dispatch = useDispatch();
  const { login } = bindActionCreators(LoginActionCreators, dispatch)
  const [isTeamSelected, setIsTeamSelected] = useState(checkIsTeamSelected() === true);
  const loginState = useSelector((state: State) => state.login)
  const sessionState = useSelector((state: State) => state.session)
  let isSessionState = typeof sessionState.currentTeam?.name !== 'undefined';

  //connect socket.io only if the user is logged in AND theyve selected a team, still need server side security of course
  useEffect(() => {
    if(loginState === 1 && isSessionState === true){
      const socket = io("http://localhost:4000");
      socket.on("connect", () => {
        const engine = socket.io.engine
        console.log(engine.transport.name)
        console.log(socket.id)
        engine.once("upgrade", () => {
          console.log(engine.transport.name)
          console.log('upgraded')
        })
      })
      socket.on("disconnect", () => {
        console.log(
          'bye bye socket'
        )
      })
    }
  }, [login])
  

  let isLogged = sessionStorage.getItem('isLoggedIn')
  if(isLogged === 'true'){
    login()
  }

  function checkIsTeamSelected() {
    if(0 === 0){
      return true
    }
    return false;
  }

  
  return (
    <ThemeProvider theme={theme}>
        <Routes>
          <Route path='signUp' element={<SignUpPage /> }/>
          <Route path='login' element={<LoginPage />} />
          

          <Route path='newTeam' //must be logged in
            element={<NewTeamPage />}/>
          <Route path='selectTeam' //must be logged in
            element={<SelectTeamPage setIsTeamSelected={setIsTeamSelected}/>}/>
          <Route path='teamInvites' //must be logged in 
            element={<TeamInvitesPage />} />


          <Route path='/' element={ //must be logged in and and have a selected team
            <NavigationSuite isTeamSelected={isTeamSelected}/>
          }
          >
            {/* <Route path='dashboard' //must be logged in and and have a selected team
              element={ 
                <DashboardPage isTeamSelected={isTeamSelected}/>
            }/> */}

            <Route path='tickets' //must be logged in and and have a selected team
              element={
                <TicketsPage isTeamSelected={isTeamSelected}/>
            }/>

            <Route path='projects' //must be logged in and and have a selected team
              element={ 
                <ProjectsPage isTeamSelected={isTeamSelected}/>
            }/>

            <Route path='team' //must be logged in and and have a selected team
              element={ 
                <ManageTeamPage isTeamSelected={isTeamSelected}/>
            }/>

          </Route>
        </Routes>
    </ThemeProvider>
  );
}

export default App;
