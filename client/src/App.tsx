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
import ManageTeamPage from './Components/Layout/Pages/ManageTeamPage/ManageTeamPage';
import ProjectsPage from './Components/Layout/Pages/ProjectsPage/ProjectsPage';
import TicketsPage from './Components/Layout/Pages/TicketsPage/TicketsPage';
import ProtectedRoute from './Components/Layout/Routes/ProtectedRoutes';
import './Sass/styles.css';
import { theme } from './theme';

// interface setIsAuth {
//   setIsAuth: Dispatch<SetStateAction<boolean>>
// }
function isLoggedIn() {
  if(localStorage.getItem('user') !== null){
    console.log('got here')
    return true
  }
  return false;
}

function App() {
  const [isAuth, setIsAuth] = useState(isLoggedIn() === true);

  useEffect(() => {
    console.log('ran it')
    setIsAuth(isLoggedIn());
  }, [])

  console.log(isAuth)
  
  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
        <Routes>
          <Route path='login' element={<LoginPage setIsAuth={setIsAuth} />} />
          
          <Route path='/' element={ //still allows users to directly render nav suite and no subcomponents
            <NavigationSuite isAuth={isAuth}/>
          }
          >
            <Route path='dashboard' //protected
              element={ 
              <DashboardPage isAuth={isAuth}/>
            }/>

            <Route path='tickets' //protected
              element={
                <TicketsPage isAuth={isAuth} />
            }/>

            <Route path='projects' //protected
              element={ 
                <ProjectsPage isAuth={isAuth} />
            }/>

            <Route path='team' //protected
              element={ 
                <ManageTeamPage isAuth={isAuth} />
            }/>

          </Route>
        </Routes>
        
      </div>
    </ThemeProvider>
  );
}

export default App;

//maybe this works for protecting wrapper route in element render prop?
{/* <ProtectedRoute isAuth={isAuth}>
  <NavigationSuite />
</ProtectedRoute> }> */}