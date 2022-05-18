import { ThemeProvider } from '@mui/material';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { boolean } from 'yup';
import { authService } from './API/Services/AuthService';
import NavigationSuite from './Components/Layout/NavigationComponents/NavigationSuite';
import DashboardPage from './Components/Layout/Pages/DashboardPage/DashboardPage';
import LoginPage from './Components/Layout/Pages/LoginPages/LoginPage';
import SignUpPage from './Components/Layout/Pages/LoginPages/SignUpPage';
import TeamSelectPage from './Components/Layout/Pages/LoginPages/SelectTeamPage';
import ManageTeamPage from './Components/Layout/Pages/ManageTeamPage/ManageTeamPage';
import ProjectsPage from './Components/Layout/Pages/ProjectsPage/ProjectsPage';
import TicketsPage from './Components/Layout/Pages/TicketsPage/TicketsPage';
import './Sass/styles.css';
import { theme } from './theme';
import SelectTeamPage from './Components/Layout/Pages/LoginPages/SelectTeamPage';

// interface setIsAuth {
//   setIsAuth: Dispatch<SetStateAction<boolean>>
// }
function checkIsLoggedIn() {
  if(sessionStorage.getItem('isLoggedIn') === 'true'){
    console.log('got here')
    return true
  }
  return false;
}
function checkIsTeamSelected() {
  if(sessionStorage.getItem('isTeamSelected') === 'true'){
    console.log('got here')
    return true
  }
  return false;
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn() === true);
  const [isTeamSelected, setIsTeamSelected] = useState(checkIsTeamSelected() === true);

  useEffect(() => {
    console.log('ran it')
    setIsLoggedIn(checkIsLoggedIn());
  }, [])

  console.log(isLoggedIn)
  
  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
        <Routes>
          <Route path='selectTeam' element={<SelectTeamPage isLoggedIn={isLoggedIn} setIsTeamSelected={setIsTeamSelected}/>}/>
          <Route path='signUp' element={<SignUpPage /> }/>
          <Route path='login' element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          
          <Route path='/' element={
            <NavigationSuite isLoggedIn={isLoggedIn} isTeamSelected={isTeamSelected}/>
          }
          >
            <Route path='dashboard' //protected
              element={ 
                <DashboardPage isLoggedIn={isLoggedIn} isTeamSelected={isTeamSelected}/>
            }/>

            <Route path='tickets' //protected
              element={
                <TicketsPage isLoggedIn={isLoggedIn} isTeamSelected={isTeamSelected}/>
            }/>

            <Route path='projects' //protected
              element={ 
                <ProjectsPage isLoggedIn={isLoggedIn} isTeamSelected={isTeamSelected}/>
            }/>

            <Route path='team' //protected
              element={ 
                <ManageTeamPage isLoggedIn={isLoggedIn} isTeamSelected={isTeamSelected}/>
            }/>

          </Route>
        </Routes>
        
      </div>
    </ThemeProvider>
  );
}

export default App;
