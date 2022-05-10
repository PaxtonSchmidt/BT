import { ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import NavigationSuite from './Components/Layout/NavigationComponents/NavigationSuite';
import DashboardPage from './Components/Layout/Pages/DashboardPage/DashboardPage';
import ManageTeamPage from './Components/Layout/Pages/ManageTeamPage/ManageTeamPage';
import ProjectsPage from './Components/Layout/Pages/ProjectsPage/ProjectsPage';
import TicketsPage from './Components/Layout/Pages/TicketsPage/TicketsPage';
import './Sass/styles.css';
import { theme } from './theme';

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
        <Routes>
          <Route path='/' element={<NavigationSuite /> }>
            <Route path='dashboard' element={<DashboardPage />} />
            <Route path='tickets' element={<TicketsPage />} />
            <Route path='projects' element={<ProjectsPage />} />
            <Route path='team' element={<ManageTeamPage />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
