import { ThemeProvider } from '@mui/material';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
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

function App() {
  const [isAuth, setIsAuth] = useState(false);
  console.log('', isAuth);

  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
        <Routes>
          <Route path='login' element={<LoginPage setIsAuth={setIsAuth} />} />
          
          <Route path='/' element={ <NavigationSuite /> }>
            <Route path='/dashboard' 
              element={ 
              <ProtectedRoute isAuth={isAuth}>
                <DashboardPage />
              </ProtectedRoute>
            }/>

            <Route path='/tickets' 
              element={
              <ProtectedRoute isAuth={isAuth}> 
                <TicketsPage />
              </ProtectedRoute> 
            }/>

            <Route path='/projects' 
              element={ 
              <ProtectedRoute isAuth={isAuth}>
                <ProjectsPage />
              </ProtectedRoute> 
            }/>

            <Route path='/team' 
              element={ 
              <ProtectedRoute isAuth={isAuth}>
                <ManageTeamPage />
              </ProtectedRoute> 
            }/>
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
