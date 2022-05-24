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
import { theme } from './theme';
import SelectTeamPage from './Components/Layout/Pages/LoginPages/SelectTeamPage';
import NewTeamPage from './Components/Layout/Pages/LoginPages/NewTeamPage';
import './Sass/styles.css';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginActionCreators } from './Redux';

function App() {
  const dispatch = useDispatch();
  const { login } = bindActionCreators(LoginActionCreators, dispatch)
  
  let isLogged = sessionStorage.getItem('isLoggedIn')
  if(isLogged === 'true'){
    login()
  }

  const [isTeamSelected, setIsTeamSelected] = useState(checkIsTeamSelected() === true);
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


          <Route path='/' element={ //must be logged in and and have a selected team
            <NavigationSuite isTeamSelected={isTeamSelected}/>
          }
          >
            <Route path='dashboard' //must be logged in and and have a selected team
              element={ 
                <DashboardPage isTeamSelected={isTeamSelected}/>
            }/>

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
